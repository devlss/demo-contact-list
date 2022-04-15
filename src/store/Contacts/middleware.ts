import {apiDeleteContact, apiGetContacts, apiPostContact, apiPutContact} from '../../api';
import {addContactsAction, removeContactAction, updateContactAction} from './actions';
import {ContactsListRequests, CONTACTS_LIST_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';

export const contactsListMiddleware: AppMiddleware = () => (next) => async (action: ContactsListRequests) => {
	switch (action.type) {
		case CONTACTS_LIST_ACTION_TYPES.R_GET: {
			const contacts = await apiGetContacts(action.payload.page, action.payload.search);
			return next(addContactsAction(...contacts));
		}
		case CONTACTS_LIST_ACTION_TYPES.R_POST: {
			const [contact, count] = await apiPostContact(action.payload);
			return next(addContactsAction([contact], count));
		}
		case CONTACTS_LIST_ACTION_TYPES.R_PUT: {
			const contact = await apiPutContact(action.payload.contact, action.payload.id);
			return next(updateContactAction(contact));
		}
		case CONTACTS_LIST_ACTION_TYPES.R_DELETE: {
			const count = await apiDeleteContact(action.payload.id);
			return next(removeContactAction(action.payload.id, count));
		}
		default:
			return next(action);
	}
};
