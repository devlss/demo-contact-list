import {FC, useCallback, useEffect, useMemo} from 'react';
import {Button, ButtonGroup, Table} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {deleteContactRequest, getContactsRequest} from '../../../store/Contacts/actions';
import {contactsListSelector, contactsPageSelector, contactsQuerySelector} from '../../../store/Contacts/selectors';
import {ModalConsumer} from '../../ContactModals';
import {setIsErrorAction} from '../../../store/Auth/actions';
import type {ContactsListComponentProps} from './ContactsListComponent.types';
import type {RecordStates} from '../../../store/Contacts/types';
import type {IApiContact} from '../../../api/types';

import './ContactsListComponent.scss';

const setRecordStateClassPreffix = 'border-end-0 border-top-0 border-bottom-0 border-5 border-';
const setRecordStateClass = (state?: RecordStates) => {
	if (state === 'new') {
		return setRecordStateClassPreffix + 'success';
	} else if (state === 'edited') {
		return setRecordStateClassPreffix + 'warning';
	} else {
		return '';
	}
};

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
				<tr
					key={contact.id}
					className={`contants-list__table-row ${setRecordStateClass(contact.state)}`}
				>
					<td>{contact.id}</td>
					<td>{contact.name}</td>
					<td>{contact.phone}</td>
					<td>{contact.email}</td>
					<td className="text-end">
						<ButtonGroup size="sm" className="contacts-list__button-group">
							<Button variant="outline-secondary contacts-list__edit-icon" onClick={() => showModal && showModal({type: 'edit', contact})} />
							<Button
								variant="outline-danger contacts-list__delete-icon"
								onClick={() => showModal && showModal({type: 'delete', contact, callback: deleteRecord})}
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

