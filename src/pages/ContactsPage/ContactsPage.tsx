import {FC, useCallback, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useAppDispatch} from '../../store/hooks';
import {getContactsRequest} from '../../store/Contacts/actions';
import {setIsErrorAction} from '../../store/Auth/actions';
import {ContactsHeaderComponent, ContactsListComponent, ContactsFooterComponent} from '../../components/ContactPageComponents';
import {ModalConfirmComponent, ModalEditorComponent} from '../../components/ContactModals';
import type {ContactsPageProps} from './ContactsPage.types';

import './ContactsPage.scss';

export const ContactsPage: FC<ContactsPageProps> = () => {
	const dispatch = useAppDispatch();

	const contactsRequest = useCallback(async () => {
		try {
			await dispatch(getContactsRequest());
		} catch (error) {
			dispatch(setIsErrorAction(true));
		}
	}, [dispatch]);

	useEffect(() => {
		contactsRequest();
	}, [contactsRequest]);

	return (
		<Container className="wrapper" as="main">
			<div className="contacts-page d-flex flex-column align-self-stretch my-3 my-md-5 rounded-3 overflow-hidden shadow">
				<ContactsHeaderComponent />
				<ContactsListComponent />
				<ContactsFooterComponent />
			</div>
			<ModalConfirmComponent />
			<ModalEditorComponent />
		</Container>
	);
};
