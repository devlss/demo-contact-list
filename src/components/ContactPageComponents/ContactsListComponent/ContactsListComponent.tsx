import {FC, useCallback, useMemo} from 'react';
import {Button, ButtonGroup, Table} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {deleteContactRequest} from '../../../store/Contacts/actions';
import {ModalConsumer} from '../../ContactModals';
import type {ContactsListComponentProps} from './ContactsListComponent.types';
import type {AppState} from '../../../store/types';
import type {IApiContact} from '../../../api/types';

import './ContactsListComponent.scss';

const contactsListSelector = ({contacts}: AppState) => contacts.list;

export const ContactsListComponent: FC<ContactsListComponentProps> = () => {
	const dispatch = useAppDispatch();
	const contacts = useAppSelector(contactsListSelector);
	const context = ModalConsumer();
	const showModal = context && context.showModal;

	const deleteRecord = useCallback(
		(contact: IApiContact) => {
			dispatch(deleteContactRequest(contact.id));
		},
		[dispatch]
	);

	const contactElements = useMemo(
		() =>
			contacts.map((contact) => (
				<tr key={contact.id} className="contants-list__table-row">
					<td>{contact.id}</td>
					<td>{contact.name}</td>
					<td>{contact.phone}</td>
					<td>{contact.email}</td>
					<td className="text-end">
						<ButtonGroup size="sm" className="contacts-list__button-group">
							<Button variant="outline-secondary contacts-list__edit-icon" />
							<Button
								variant="outline-danger contacts-list__delete-icon"
								onClick={() => showModal && showModal('delete', contact, deleteRecord)}
							/>
						</ButtonGroup>
					</td>
				</tr>
			)),
		[showModal, contacts, deleteRecord]
	);

	return (
		<div className="contacts-list flex-grow-1 p-3 pt-0 px-md-5">
			<Table borderless hover className="contacts-list-table">
				<thead className="contacts-list-table__header">
					<tr>
						<th className="contacts-list-table__column-number">#</th>
						<th>Name</th>
						<th>Phone</th>
						<th>Email</th>
						<th className="contacts-list-table__column-buttons"></th>
					</tr>
				</thead>
				<tbody>{contactElements}</tbody>
			</Table>
		</div>
	);
};
