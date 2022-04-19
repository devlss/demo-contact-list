import {FC, useCallback, useEffect, useMemo} from 'react';
import {Badge, Button, ButtonGroup, Col, Row} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {deleteContactRequest, getContactsRequest} from '../../../store/Contacts/actions';
import {contactsListSelector, contactsPageSelector, contactsQuerySelector} from '../../../store/Contacts/selectors';
import {ModalConsumer} from '../../ContactModals';
import {setIsErrorAction} from '../../../store/Auth/actions';
import type {ContactsListComponentProps} from './ContactsListComponent.types';
import type {IApiContact} from '../../../api/types';

import './ContactsListComponent.scss';

export const ContactsListComponent: FC<ContactsListComponentProps> = () => {
	const dispatch = useAppDispatch();
	const contacts = useAppSelector(contactsListSelector);
	const page = useAppSelector(contactsPageSelector);
	const query = useAppSelector(contactsQuerySelector);
	const context = ModalConsumer();
	const showModal = context && context.showModal;

	const contactsRequest = useCallback(async () => {
		try {
			await dispatch(getContactsRequest(page, undefined, query));
		} catch (error) {
			dispatch(setIsErrorAction(true));
		}
	}, [dispatch, page, query]);

	useEffect(() => {
		contactsRequest();
	}, [contactsRequest]);

	const deleteRecord = useCallback(
		(contact: IApiContact) => {
			dispatch(deleteContactRequest(contact.id));
		},
		[dispatch]
	);

	const contactElements = useMemo(
		() =>
			contacts.map((contact) => (
				<Row key={contact.id} className="contacts-list__table-row align-items-center gx-0 p-3 py-lg-2 border border-1 rounded-3">
					<Col xs={1} className="mb-3 mb-lg-0 me-2 me-sm-0">
						<Badge bg="light" text="dark" className={contact.state ? 'badge-mark badge-mark_' + contact.state : ''}>
							{contact.id}
						</Badge>
					</Col>
					<Col xs={'auto'} lg={3} className="text-truncate mb-3 mb-lg-0">
						{contact.name}
					</Col>
					<Col lg={2} className="text-truncate">
						{contact.phone}
					</Col>
					<Col lg={4} className="text-truncate mb-3 mb-lg-0">
						{contact.email}
					</Col>
					<Col lg={2} className="flex-table__col-id text-lg-end mb-2 mb-lg-0">
						<ButtonGroup size="sm" className="contacts-list__button-group opacity-lg-25">
							<Button variant="outline-secondary" onClick={() => showModal && showModal({type: 'edit', contact})} className="button__icon_edit">
								<span className="button__text d-inline d-lg-none">Edit</span>
							</Button>
							<Button
								variant="outline-danger contacts-list__icon_delete"
								onClick={() => showModal && showModal({type: 'delete', contact, callback: deleteRecord})}
								className="button__icon_delete"
							>
								<span className="button__text d-inline d-lg-none">Delete</span>
							</Button>
						</ButtonGroup>
					</Col>
				</Row>
			)),
		[showModal, contacts, deleteRecord]
	);

	return (
		<div className="contacts-list flex-grow-1 d-flex flex-column align-items-stretch gap-2 px-3 px-md-5 py-2 pt-lg-0">
			<Row className="contacts-list__table-header align-items-center d-none d-lg-flex gx-0 p-3 p-lg-2">
				<Col xs={4} sm={1} className="mb-3 mb-lg-0">
					<span className="px-2 fw-bold">#</span>
				</Col>
				<Col xs={8} lg={3} className="text-truncate mb-3 mb-lg-0">
					Name
				</Col>
				<Col lg={2} className="text-truncate">
					Phone
				</Col>
				<Col lg={4} className="text-truncate mb-3 mb-lg-0">
					Email
				</Col>
			</Row>
			{contactElements}
		</div>
	);
};
