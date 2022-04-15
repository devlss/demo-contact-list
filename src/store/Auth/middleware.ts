import {encodeAuthKey, removeAuthKey, setAuthKey} from '../../auth/authHelper';
import {setKeyAction} from './actions';
import {AuthActions, AUTH_ACTION_TYPES} from './types';
import type {AppMiddleware} from '../types';

export const authMiddleware: AppMiddleware = () => (next) => (action: AuthActions) => {
	switch (action.type) {
		case AUTH_ACTION_TYPES.LOGIN: {
			const encodedAuthKey = encodeAuthKey(action.payload.login, action.payload.password);
			setAuthKey(encodedAuthKey);
			return next(setKeyAction(encodedAuthKey));
		}
		case AUTH_ACTION_TYPES.LOGOUT: {
			removeAuthKey();
			break;
		}
		case AUTH_ACTION_TYPES.SET_IS_ERROR: {
			if (action.payload) {
				removeAuthKey();
			}
		}
	}
	return next(action);
};
