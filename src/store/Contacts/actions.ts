import {IApiContact, IContact} from '../../api/types';
import {
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

export function addContactsAction(contacts: IApiContact[], count: number): AddContactsAction {
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

export function removeContactAction(id: number, count: number): RemoveContactAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.REMOVE,
		payload: {
			id,
			count
		}
	};
}

export function clearContactsAction(): ClearContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.CLEAR
	};
}

export function getContactsRequest(page = 1, search = ''): GetContactsRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_GET,
		payload: {
			page,
			search
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

export function deleteContactRequest(id: number): DeleteContactRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_DELETE,
		payload: {
			id
		}
	};
}
