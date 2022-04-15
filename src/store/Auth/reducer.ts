import {getAuthKey} from '../../auth/authHelper';
import {IAuthState, AUTH_ACTION_TYPES, AuthActions} from './types';

const initialState: IAuthState = {
	key: getAuthKey() || undefined
};

export const authReducer = (state = initialState, action: AuthActions): IAuthState => {
	switch (action.type) {
		case AUTH_ACTION_TYPES.SET_KEY: {
			return {key: action.payload};
		}
		case AUTH_ACTION_TYPES.LOGOUT: {
			return {key: undefined};
		}
		default:
			return state;
	}
};
