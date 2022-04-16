import {IApiContact, IApiGetOptions, IContact} from '../../api/types';

export interface IContactsListState {
	list: IApiContact[];
	count: number;
}

export interface IPutRequestParams {
	id: number;
	contact: IContact;
}

export const enum CONTACTS_LIST_ACTION_TYPES {
	SET = 'dcl/contacts/set',
	ADD = 'dcl/contacts/add',
	UPDATE = 'dcl/contacts/update',
	REMOVE = 'dcl/contacts/remove',
	CLEAR = 'dcl/contacts/clear',
	R_GET = 'dcl/contacts/r-get',
	R_POST = 'dcl/contacts/r-post',
	R_PUT = 'dcl/contacts/r-put',
	R_DELETE = 'dcl/contacts/r-delete'
}

export interface SetContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.SET;
	payload: {contacts: IApiContact[], count?: number};
}

export interface AddContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.ADD;
	payload: {contacts: IApiContact[], count?: number};
}

export interface UpdateContactAction {
	type: CONTACTS_LIST_ACTION_TYPES.UPDATE;
	payload: IApiContact;
}
export interface RemoveContactAction {
	type: CONTACTS_LIST_ACTION_TYPES.REMOVE;
	payload: {id: number};
}
export interface ClearContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.CLEAR;
}

export interface GetContactsRequest {
	type: CONTACTS_LIST_ACTION_TYPES.R_GET;
	payload: IApiGetOptions;
}

export interface PostContactRequest {
	type: CONTACTS_LIST_ACTION_TYPES.R_POST;
	payload: IContact;
}

export interface PutContactRequest {
	type: CONTACTS_LIST_ACTION_TYPES.R_PUT;
	payload: IPutRequestParams;
}

export interface DeleteContactRequest {
	type: CONTACTS_LIST_ACTION_TYPES.R_DELETE;
	payload: {id: number, options: IApiGetOptions};
}

export type ContactsListActions = SetContactsAction | AddContactsAction | UpdateContactAction | RemoveContactAction | ClearContactsAction;
export type ContactsListRequests = GetContactsRequest | PostContactRequest | PutContactRequest | DeleteContactRequest;
