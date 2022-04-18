import {apiDeleteContact, apiGetContacts, apiPostContact, apiPutContact} from '../../api';
import {setContactsAction, addContactAction, removeContactAction, updateContactAction} from './actions';
import {contactsIsLastPageSelector, contactsPageSelector, contactsQuerySelector} from './selectors';
import {CHUNK_SIZE} from '../../params';
import {ContactsListRequests, CONTACTS_LIST_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';
import type {IApiContact} from '../../api/types';

export const contactsListMiddleware: AppMiddleware =
	({getState}) =>
	(next) =>
	async (action: ContactsListRequests) => {
		switch (action.type) {
			case CONTACTS_LIST_ACTION_TYPES.R_GET: {
				const contactsTuple = await apiGetContacts(action.payload);
				return next(setContactsAction(...contactsTuple));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_POST: {
				const contact = await apiPostContact(action.payload);
				return next(addContactAction({...contact, state: 'new'}));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_PUT: {
				const contact = await apiPutContact(action.payload.contact, action.payload.id);
				return next(updateContactAction({...contact, state: 'edited'}));
			}
			case CONTACTS_LIST_ACTION_TYPES.R_DELETE: {
				await apiDeleteContact(action.payload.id);
				const state = getState();
				const isLastPage = contactsIsLastPageSelector(state);
				let contact: IApiContact | undefined = undefined;
				if (!isLastPage) {
					const page = contactsPageSelector(state);
					const query = contactsQuerySelector(state);
					const [contacts] = await apiGetContacts({start: page * CHUNK_SIZE - 1, limit: 1, query});
					contact = contacts[0];
				}
				return next(removeContactAction(action.payload.id, contact));
			}
			default:
				return next(action);
		}
	};
