import {FC, useCallback} from 'react';
import {Button} from 'react-bootstrap';
import {ModalConsumer} from '../../ContactModals';
import {IApiContact} from '../../../api/types';
import {useAppDispatch} from '../../../store/hooks';
import {postContactRequest} from '../../../store/Contacts/actions';
import type {ContactsHeaderComponentProps} from './ContactsHeaderComponent.types';

import './ContactsHeaderComponent.scss';
import {logoutAction} from '../../../store/Auth/actions';

export const ContactsHeaderComponent: FC<ContactsHeaderComponentProps> = () => {
	const dispatch = useAppDispatch();
	const context = ModalConsumer();
	const showModal = context && context.showModal;

	const deleteRecord = useCallback(
		(contact: IApiContact) => {
			dispatch(postContactRequest(contact));
		},
		[dispatch]
	);

	return (
		<header className="contacts-header d-flex justify-content-center py-2 px-3 px-md-5 border-bottom">
			<Button variant="outline-secondary contacts-header__logout" onClick={() => dispatch(logoutAction())}>
				Logout
			</Button>
			<div className='flex-grow-1'></div>
			<Button variant="success contacts-header__new-icon" onClick={() => showModal && showModal({type: 'new', callback: deleteRecord})}>
				Add
			</Button>
		</header>
	);
};
