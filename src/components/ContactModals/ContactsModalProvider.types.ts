import {IApiContact} from '../../api/types';

type ModalCallback = (contact: IApiContact) => void;

export type ModalsActions = 'delete' | 'new' | 'edit';

export interface IContactsPageModalProvider {
	state: IContactsPageModalState | undefined;
	showModal: (action: ModalsActions, contact: IApiContact, callback: ModalCallback) => void;
	hideModal: () => void;
}

export interface IContactsPageModalState {
	contact: IApiContact;
	action: ModalsActions;
	callback: ModalCallback;
}
