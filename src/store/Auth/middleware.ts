import {encodeAuthKey, removeAuthKey, setAuthKey} from '../../auth/authHelper';
import {clearContactsAction} from '../Contacts/actions';
import {setKeyAction} from './actions';
import {AuthActions, AUTH_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';

export const authMiddleware: AppMiddleware = ({dispatch}) => (next) => (action: AuthActions) => {
	switch (action.type) {
		case AUTH_ACTION_TYPES.LOGIN: {
			const encodedAuthKey = encodeAuthKey(action.payload.login, action.payload.password);
			setAuthKey(encodedAuthKey);
			return next(setKeyAction(encodedAuthKey));
		}
		case AUTH_ACTION_TYPES.LOGOUT: {
			dispatch(clearContactsAction());
			removeAuthKey();
			break;
		}
	}
	return next(action);
};
