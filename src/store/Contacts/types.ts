import {IApiContact, IApiGetOptions, IContact} from '../../api/types';

export interface IContactsListState {
	list: IContactWithState[];
	count: number;
	page: number;
	query?: string;
}

export interface IPutRequestParams {
	id: number;
	contact: IContact;
}

export type RecordStates = 'new' | 'edited';

export interface IContactWithState extends IApiContact {
	state?: RecordStates;
}

export const enum CONTACTS_LIST_ACTION_TYPES {
	SET = 'dcl/contacts/set',
	ADD = 'dcl/contacts/add',
	UPDATE = 'dcl/contacts/update',
	REMOVE = 'dcl/contacts/remove',
	SET_PAGE = 'dcl/contacts/set-page',
	SET_QUERY = 'dcl/contacts/set-query',
	CLEAR = 'dcl/contacts/clear',
	R_GET = 'dcl/contacts/r-get',
	R_POST = 'dcl/contacts/r-post',
	R_PUT = 'dcl/contacts/r-put',
	R_DELETE = 'dcl/contacts/r-delete'
}

export interface SetContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.SET;
	payload: {contacts: IApiContact[]; count: number};
}

export interface AddContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.ADD;
	payload: IContactWithState;
}

export interface UpdateContactAction {
	type: CONTACTS_LIST_ACTION_TYPES.UPDATE;
	payload: IContactWithState;
}

export interface RemoveContactAction {
	type: CONTACTS_LIST_ACTION_TYPES.REMOVE;
	payload: {id: number, replaceContact?: IApiContact};
}

export interface SetPageContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.SET_PAGE;
	payload: number;
}

export interface SetQueryContactsAction {
	type: CONTACTS_LIST_ACTION_TYPES.SET_QUERY;
	payload?: string;
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
	payload: {id: number};
}

export type ContactsListActions =
	| SetContactsAction
	| AddContactsAction
	| UpdateContactAction
	| RemoveContactAction
	| SetPageContactsAction
	| SetQueryContactsAction
	| ClearContactsAction;

export type ContactsListRequests = GetContactsRequest | PostContactRequest | PutContactRequest | DeleteContactRequest;
