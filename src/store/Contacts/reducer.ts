import {ContactsListActions, CONTACTS_LIST_ACTION_TYPES, IContactsListState} from './types';

const initialState: IContactsListState = {
	list: [],
	count: 0,
	page: 1,
	query: undefined
};

export const contactsListReducer = (state = initialState, action: ContactsListActions): IContactsListState => {
	switch (action.type) {
		case CONTACTS_LIST_ACTION_TYPES.SET: {
			return {
				list: [...action.payload.contacts],
				count: action.payload.count,
				page: state.page,
				query: state.query
			};
		}
		case CONTACTS_LIST_ACTION_TYPES.ADD: {
			return {
				list: [action.payload, ...state.list],
				count: state.count + 1,
				page: state.page,
				query: state.query
			};
		}
		case CONTACTS_LIST_ACTION_TYPES.UPDATE:
		case CONTACTS_LIST_ACTION_TYPES.REMOVE: {
			// Ищем запись по id  в списке
			const contactId = state.list.findIndex((contact) => contact.id === action.payload.id);
			// Если нашли выполнем действия
			if (contactId !== null && contactId !== undefined) {
				const newList = [...state.list];
				let count = state.count;
				// Если редактирование, заменяем старый вариант записи на новый
				if (action.type === CONTACTS_LIST_ACTION_TYPES.UPDATE) {
					newList[contactId] = action.payload;
					// Если удаление, вырезаем запись из списка и уменьшаем счетчик если он > 0
				} else if (action.type === CONTACTS_LIST_ACTION_TYPES.REMOVE) {
					newList.splice(contactId, 1);
					// Добавляем запись на данную страницу со следующей если она есть(т.е. если не последняя страница)
					// Необходимо чтобы заполнить пропуск после удаления
					// Как вариант просто запросить всю страницу ещее раз
					if (action.payload.replaceContact) {
						// При добавлени проверяем, есть ли уже такая запись
						// Необходимо из за добавления новых записей всегда на текущую страницу
						// TODO возможно есть другие стратегии работы с пагинацией
						const hasSameContact = state.list.some((contact) => contact.id === action.payload.replaceContact!.id);
						if (!hasSameContact) {
							newList.push(action.payload.replaceContact);
						}
					}
					count = Math.max(0, state.count - 1);
				}
				return {list: newList, count, page: state.page, query: state.query};
			}
			return state;
		}
		case CONTACTS_LIST_ACTION_TYPES.SET_PAGE: {
			return {...state, page: action.payload};
		}
		case CONTACTS_LIST_ACTION_TYPES.SET_QUERY: {
			return {...state, page: 1, query: action.payload};
		}
		case CONTACTS_LIST_ACTION_TYPES.CLEAR: {
			return initialState;
		}
		default:
			return state;
	}
};
