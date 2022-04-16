import {ContactsListActions, CONTACTS_LIST_ACTION_TYPES, IContactsListState} from './types';

const initialState: IContactsListState = {
	list: [],
	count: 0
};

export const contactsListReducer = (state = initialState, action: ContactsListActions): IContactsListState => {
	switch (action.type) {
		case CONTACTS_LIST_ACTION_TYPES.SET: {
			return {list: [...action.payload.contacts], count: action.payload.count || state.count + action.payload.contacts.length};
		}
		case CONTACTS_LIST_ACTION_TYPES.ADD: {
			return {list: [...state.list, ...action.payload.contacts], count: action.payload.count || state.count + action.payload.contacts.length};
		}
		case CONTACTS_LIST_ACTION_TYPES.UPDATE:
		case CONTACTS_LIST_ACTION_TYPES.REMOVE: {
			const contactId = state.list.findIndex((contact) => contact.id === action.payload.id);
			if (contactId !== null && contactId !== undefined) {
				const newList = [...state.list];
				let count = state.count;
				if (action.type === CONTACTS_LIST_ACTION_TYPES.UPDATE) {
					newList[contactId] = action.payload;
				} else if (action.type === CONTACTS_LIST_ACTION_TYPES.REMOVE) {
					newList.splice(contactId, 1);
					count = state.count && state.count - 1;
				}
				return {list: newList, count};
			}
			return state;
		}
		case CONTACTS_LIST_ACTION_TYPES.CLEAR: {
			return {list: [], count: 0};
		}
		default:
			return state;
	}
};
