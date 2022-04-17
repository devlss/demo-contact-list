import {apiDeleteContact, apiGetContacts, apiPostContact, apiPutContact} from '../../api';
import {setContactsAction, addContactsAction, removeContactAction, updateContactAction} from './actions';
import {CHUNK_SIZE} from '../../params';
import {ContactsListRequests, CONTACTS_LIST_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';

export const contactsListMiddleware: AppMiddleware =
	({dispatch}) =>
	(next) =>
	async (action: ContactsListRequests) => {
		switch (action.type) {
			case CONTACTS_LIST_ACTION_TYPES.R_GET: {
				const contactsTuple = await apiGetContacts(action.payload);
				return next(setContactsAction(...contactsTuple));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_POST: {
				const contact = await apiPostContact(action.payload);
				return next(addContactsAction([{...contact, state: 'new'}]));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_PUT: {
				const contact = await apiPutContact(action.payload.contact, action.payload.id);
				return next(updateContactAction({...contact, state: 'edited'}));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_DELETE: {
				await apiDeleteContact(action.payload.id);
				if (action.payload.options && action.payload.options.page) {
					const requestToReplace = {...action.payload.options};
					requestToReplace.start = action.payload.options.page * CHUNK_SIZE - 1;
					requestToReplace.limit = 1;
					delete requestToReplace.page;
					dispatch(removeContactAction(action.payload.id));
					const contactTuple = await apiGetContacts(requestToReplace);
					if (contactTuple[0]) {
						return next(addContactsAction(...contactTuple));
					} else {
						return;
					}
				} else {
					return next(removeContactAction(action.payload.id));
				}
			}
			default:
				return next(action);
		}
	};
