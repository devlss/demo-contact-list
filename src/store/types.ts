import {CombinedState, Middleware} from 'redux';
import {IAuthState} from './Auth/types';
import {IContactsListState} from './Contacts/types';

export type AppState = CombinedState<{
	contacts: IContactsListState;
	auth: IAuthState;
}>;
export type AppMiddleware<T = {}> = Middleware<T, AppState>;
