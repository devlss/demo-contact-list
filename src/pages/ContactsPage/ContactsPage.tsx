import {FC, useCallback, useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {getContactsRequest} from '../../store/Contacts/actions';
import {setIsErrorAction} from '../../store/Auth/actions';
import type {ContactsProps} from './ContactsPage.types';

import './ContactsPage.scss';

export const ContactsPage: FC<ContactsProps> = () => {
	const dispatch = useAppDispatch();
	const contacts = useAppSelector(({contacts}) => contacts.list);
	const contactElements = useMemo(
		() =>
			contacts.map((contact) => (
				<div key={contact.id}>
					<div>{contact.name}</div>
					<div>{contact.phone}</div>
					<div>{contact.email}</div>
				</div>
			)),
		[contacts]
	);

	const contactsRequest = useCallback(async () => {
		try {
			await dispatch(getContactsRequest());
			dispatch(setIsErrorAction(false));
		} catch (error) {
			dispatch(setIsErrorAction(true));
		}
	}, [dispatch]);

	useEffect(() => {
		contactsRequest();
	}, [contactsRequest]);

	return <div className="contacts-page">{contactElements}</div>;
};
