import {ChangeEvent, FC, useCallback, useRef} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import {ModalConsumer} from '../../ContactModals';
import {IApiContact} from '../../../api/types';
import {useAppDispatch} from '../../../store/hooks';
import {postContactRequest, setQueryContactsAction} from '../../../store/Contacts/actions';
import {logoutAction} from '../../../store/Auth/actions';
import {debounce} from '../../../helper';
import type {ContactsHeaderComponentProps} from './ContactsHeaderComponent.types';

import './ContactsHeaderComponent.scss';

export const ContactsHeaderComponent: FC<ContactsHeaderComponentProps> = () => {
	const dispatch = useAppDispatch();
	const context = ModalConsumer();
	const showModal = context && context.showModal;

	const inputRef = useRef<HTMLInputElement>(null);

	const createRecord = useCallback(
		(contact: IApiContact) => {
			dispatch(postContactRequest(contact));
		},
		[dispatch]
	);

	const searchHandler = useCallback(
		async (event: ChangeEvent<HTMLInputElement>) => {
			console.dir(inputRef.current);
			await dispatch(setQueryContactsAction(event.target.value));
		},
		[dispatch]
	);

	const clearHandler = useCallback(async () => {
		const input = inputRef.current!;
		if (input.value) {
			input.value = '';
			await dispatch(setQueryContactsAction());
		}
	}, [dispatch]);

	return (
		<header className="contacts-header d-flex justify-content-center align-items-center gap-2 pap-sm-3 py-2 px-3 px-md-5 border-bottom">
			<Button variant="outline-secondary" onClick={() => dispatch(logoutAction())} className="button__icon_logout">
				<span className="button__text d-none d-sm-inline">Logout</span>
			</Button>
			<Form className="flex-grow-1">
				<InputGroup>
					<InputGroup.Text className="button__icon_search px-1 px-sm-2" />
					<Form.Control ref={inputRef} type="text" placeholder="search" onChange={debounce(searchHandler, 500)} />
					<Button variant="outline-secondary" onClick={clearHandler} className="button__icon_delete" />
				</InputGroup>
			</Form>
			<Button variant="success" onClick={() => showModal && showModal({type: 'new', callback: createRecord})} className="button__icon_new">
				<span className="button__text d-none d-sm-inline">Add</span>
			</Button>
		</header>
	);
};
