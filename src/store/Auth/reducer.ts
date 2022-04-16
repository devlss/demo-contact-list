import {getAuthKey} from '../../auth/authHelper';
import {IAuthState, AUTH_ACTION_TYPES, AuthActions} from './types';

const initialState: IAuthState = {
	key: getAuthKey() || undefined,
	error: false
};

export const authReducer = (state = initialState, action: AuthActions): IAuthState => {
	switch (action.type) {
		case AUTH_ACTION_TYPES.LOGOUT: {
			return {key: undefined, error: false};
		}
		case AUTH_ACTION_TYPES.SET_KEY: {
			return {key: action.payload, error: false};
		}
		case AUTH_ACTION_TYPES.SET_IS_ERROR: {
			const isError = action.payload;
			return {key: isError ? undefined : state.key, error: isError};
		}
		default:
			return state;
	}
};
