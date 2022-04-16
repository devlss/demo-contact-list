import {createContext, useCallback, useContext, useState} from 'react';
import {IContactsPageModalState, IContactsPageModalProvider, ModalsActions} from '.';
import type {IApiContact} from '../../api/types';

const ModalContext = createContext<IContactsPageModalProvider | undefined>(undefined);

export const ContactsModalProvider = ({children}: {children: JSX.Element}) => {
	const [state, setState] = useState<IContactsPageModalState>();
	const showModal = useCallback((action: ModalsActions, contact: IApiContact, callback: (contact: IApiContact) => void) => {
		setState({
			action,
			contact,
			callback
		});
	}, []);
	const hideModal = () => setState(undefined);

	const ctxState = {
		state,
		showModal,
		hideModal
	};

	return <ModalContext.Provider value={ctxState}>{children}</ModalContext.Provider>;
};

export const ModalConsumer = () => useContext(ModalContext);
