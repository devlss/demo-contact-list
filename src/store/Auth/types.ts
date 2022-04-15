export interface IAuthState {
	key?: string;
}

export const enum AUTH_ACTION_TYPES {
	LOGIN = 'dcl/auth/login',
	LOGOUT = 'dcl/auth/logout',
	SET_KEY = 'dcl/auth/set-key'
}

export interface LoginAction {
	type: AUTH_ACTION_TYPES.LOGIN;
	payload: {
		login: string;
		password: string;
	};
}

export interface LogoutAction {
	type: AUTH_ACTION_TYPES.LOGOUT;
}

export interface SetKeyAction {
	type: AUTH_ACTION_TYPES.SET_KEY;
	payload: string;
}

export type AuthActions = LoginAction | LogoutAction | SetKeyAction;
