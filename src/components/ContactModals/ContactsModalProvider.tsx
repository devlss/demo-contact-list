import {createContext, useCallback, useContext, useState} from 'react';
import {ContactsPageModalActions, IContactsPageModalProvider} from '.';
import type {IApiContact} from '../../api/types';

const ModalContext = createContext<IContactsPageModalProvider>({
	state: {type: 'other'},
	showModal: () => {},
	hideModal: () => {}
});

export const ContactsModalProvider = ({children}: {children: JSX.Element}) => {
	const [state, setState] = useState<ContactsPageModalActions>({type: 'other'});
	const hideModal = () => setState({type: 'other'});

	const ctxState = {
		state,
		showModal: setState,
		hideModal
	};

	return <ModalContext.Provider value={ctxState}>{children}</ModalContext.Provider>;
};

export const ModalConsumer = () => useContext(ModalContext);
