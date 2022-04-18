import {FC} from 'react';
import {Container} from 'react-bootstrap';
import {ContactsHeaderComponent, ContactsListComponent, ContactsFooterComponent} from '../../components/ContactPageComponents';
import {ModalConfirmComponent, ModalEditorComponent} from '../../components/ContactModals';
import type {ContactsPageProps} from './ContactsPage.types';

export const ContactsPage: FC<ContactsPageProps> = () => (
	<Container className="wrapper" as="main">
		<div className="w-100 d-flex flex-column align-self-stretch my-3 my-md-5 rounded-3 overflow-hidden bg-light shadow">
			<ContactsHeaderComponent />
			<ContactsListComponent />
			<ContactsFooterComponent />
		</div>
		<ModalConfirmComponent />
		<ModalEditorComponent />
	</Container>
);
