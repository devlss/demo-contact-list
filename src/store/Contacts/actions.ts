import {IApiContact, IContact} from '../../api/types';
import {CHUNK_SIZE} from '../../params';
import {
	SetContactsAction,
	AddContactsAction,
	ClearContactsAction,
	DeleteContactRequest,
	GetContactsRequest,
	PostContactRequest,
	PutContactRequest,
	RemoveContactAction,
	UpdateContactAction,
	CONTACTS_LIST_ACTION_TYPES
} from './types';

export function setContactsAction(contacts: IApiContact[], count?: number): SetContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.SET,
		payload: {
			contacts,
			count
		}
	};
}

export function addContactsAction(contacts: IApiContact[], count?: number): AddContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.ADD,
		payload: {
			contacts,
			count
		}
	};
}

export function updateContactAction(payload: IApiContact): UpdateContactAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.UPDATE,
		payload
	};
}

export function removeContactAction(id: number): RemoveContactAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.REMOVE,
		payload: {
			id
		}
	};
}

export function clearContactsAction(): ClearContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.CLEAR
	};
}

export function getContactsRequest(page = 1, limit = CHUNK_SIZE, query = ''): GetContactsRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_GET,
		payload: {
			page,
			limit,
			query
		}
	};
}

export function postContactRequest(payload: IContact): PostContactRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_POST,
		payload
	};
}

export function putContactRequest(id: number, contact: IContact): PutContactRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_PUT,
		payload: {
			id,
			contact
		}
	};
}

export function deleteContactRequest(id: number, page = 1, limit = CHUNK_SIZE, query = ''): DeleteContactRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_DELETE,
		payload: {
			id,
			options: {
				page,
				limit,
				query
			}
		}
	};
}
