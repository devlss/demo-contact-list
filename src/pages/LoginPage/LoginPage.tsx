import {FC, useCallback} from 'react';
import {Navigate} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {loginAction} from '../../store/Auth/actions';
import type {LoginProps} from './LoginPage.types';

import './LoginPage.scss';

export const LoginPage: FC<LoginProps> = () => {
	const dispatch = useAppDispatch();
	const auth = useAppSelector(({auth}) => auth.key)
	const loginHandler = useCallback(() => {
		dispatch(loginAction('root', '123456'));
	}, [dispatch]);

	return (
		<>
			{auth ? (
				<Navigate to="/contacts" />
			) : (
				<Button variant="primary" onClick={loginHandler}>
					GoToContacts
				</Button>
			)}
		</>
	);
};
