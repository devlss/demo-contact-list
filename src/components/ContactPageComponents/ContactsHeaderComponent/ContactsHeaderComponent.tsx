import {ChangeEvent, FC, useCallback, useRef} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {ModalConsumer} from '../../ContactModals';
import {IApiContact} from '../../../api/types';
import {useAppDispatch} from '../../../store/hooks';
import {getContactsRequest, postContactRequest} from '../../../store/Contacts/actions';
import {logoutAction} from '../../../store/Auth/actions';
import {debounce} from '../../../helper';
import {CHUNK_SIZE} from '../../../params';
import type {ContactsHeaderComponentProps} from './ContactsHeaderComponent.types';

import './ContactsHeaderComponent.scss';

export const ContactsHeaderComponent: FC<ContactsHeaderComponentProps> = () => {
	const dispatch = useAppDispatch();
	const context = ModalConsumer();
	const showModal = context && context.showModal;

	const inputRef = useRef<HTMLInputElement>(null);

	const deleteRecord = useCallback(
		(contact: IApiContact) => {
			dispatch(postContactRequest(contact));
		},
		[dispatch]
	);

	const searchHandler = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			console.dir(inputRef.current);
			await dispatch(getContactsRequest(1, CHUNK_SIZE, event.target.value));
		},
		[dispatch]
	);

	const clearHandler = useCallback(async () => {
		const input = inputRef.current!;
		if (input.value) {
			input.value = '';
			await dispatch(getContactsRequest());
		}
	}, [dispatch]);

	return (
		<header className="contacts-header d-flex justify-content-center align-items-center gap-3 py-2 px-3 px-md-5 border-bottom">
			<Button variant="outline-secondary contacts-header__logout" onClick={() => dispatch(logoutAction())}>
				Logout
			</Button>
			<Form className="flex-grow-1">
				<InputGroup>
					<InputGroup.Text className="contacts-header__search-icon" />
					<Form.Control ref={inputRef} type="text" placeholder="search" onChange={debounce(searchHandler, 500)} />
					<Button variant="outline-secondary" onClick={clearHandler} className="contacts-header__delete-icon"/>
				</InputGroup>
			</Form>
			<Button variant="success contacts-header__new-icon" onClick={() => showModal && showModal({type: 'new', callback: deleteRecord})}>
				Add
			</Button>
		</header>
	);
};
