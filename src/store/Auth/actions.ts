import {AUTH_ACTION_TYPES} from './types';

export function loginAction(login: string, password: string) {
	return {
		type: AUTH_ACTION_TYPES.LOGIN,
		payload: {
			login,
			password
		}
	};
}

export function setKeyAction(payload: string) {
	return {
		type: AUTH_ACTION_TYPES.SET_KEY,
		payload
	};
}

export function logoutAction(payload = false) {
	return {
		type: AUTH_ACTION_TYPES.LOGOUT,
		payload
	};
}
