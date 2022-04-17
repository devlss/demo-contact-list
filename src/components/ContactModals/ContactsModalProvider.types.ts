import {IApiContact} from '../../api/types';

type ModalCallback = (contact: IApiContact) => void;

export interface IContactsPageModalProvider {
	state: ContactsPageModalActions;
	showModal: (action: ContactsPageModalActions) => void;
	hideModal: () => void;
}

export interface IModalDefaultAction {
	type: 'other';
}

export interface IModalEditorNewAction {
	type: 'new';
	callback: ModalCallback;
}

export interface IModalConfirmAction {
	type: 'delete';
	callback: ModalCallback;
	contact: IApiContact;
}

export interface IModalEditorEditAction {
	type: 'edit';
	contact: IApiContact;
}

export type ContactsPageModalActions = IModalDefaultAction | IModalEditorNewAction | IModalConfirmAction | IModalEditorEditAction;
