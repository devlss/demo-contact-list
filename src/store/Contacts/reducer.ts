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
			return {...state, list: [...action.payload.contacts], count: action.payload.count};
		}
		case CONTACTS_LIST_ACTION_TYPES.ADD: {
			return {...state, list: [action.payload, ...state.list], count: state.count + 1};
		}
		case CONTACTS_LIST_ACTION_TYPES.UPDATE: {
			const contactIdx = state.list.findIndex((contact) => contact.id === action.payload.id);
			if (contactIdx > -1) {
				const newContactList = [...state.list];
				newContactList.splice(contactIdx, 1, action.payload);
				return {...state, list: newContactList};
			}
			return state;
		}
		case CONTACTS_LIST_ACTION_TYPES.REMOVE: {
			const newContactList = state.list.filter((contact) => contact.id !== action.payload.id);
			const count = Math.max(0, state.count - 1);
			// Добавляем запись на данную страницу со следующей если она есть(т.е. если не последняя страница)
			// Необходимо чтобы заполнить пропуск после удаления
			// Как вариант просто запросить всю страницу еще раз
			if (action.payload.replaceContact) {
				// При добавлени проверяем, есть ли уже такая запись
				// Необходимо из за добавления новых записей всегда на текущую страницу
				// TODO возможно есть другие стратегии работы с пагинацией
				const hasSameContact = state.list.some((contact) => contact.id === action.payload.replaceContact!.id);
				if (!hasSameContact) {
					newContactList.push(action.payload.replaceContact);
				}
			}
			return {...state, list: newContactList, count};
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
