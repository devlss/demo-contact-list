import {IApiContact, IApiGetOptions, IContact} from '../../api/types';
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
	IContactWithState,
	SetPageContactsAction,
	SetQueryContactsAction,
	CONTACTS_LIST_ACTION_TYPES
} from './types';

export function setContactsAction(contacts: IApiContact[], count: number): SetContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.SET,
		payload: {
			contacts,
			count
		}
	};
}

export function addContactAction(payload: IContactWithState): AddContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.ADD,
		payload
	};
}

export function updateContactAction(payload: IContactWithState): UpdateContactAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.UPDATE,
		payload
	};
}

export function removeContactAction(id: number, replaceContact?: IApiContact): RemoveContactAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.REMOVE,
		payload: {
			id,
			replaceContact
		}
	};
}

export function setPageContactsAction(payload: number): SetPageContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.SET_PAGE,
		payload
	};
}

export function setQueryContactsAction(payload?: string): SetQueryContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.SET_QUERY,
		payload
	};
}

export function clearContactsAction(): ClearContactsAction {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.CLEAR
	};
}

export function getContactsRequest(payload: IApiGetOptions): GetContactsRequest {
	return {
		type: CONTACTS_LIST_ACTION_TYPES.R_GET,
		payload
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
