import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevToolsDevelopmentOnly} from '@redux-devtools/extension';
import {contactsListReducer} from './Contacts/reducer';
import {contactsListMiddleware} from './Contacts/middleware';
import {loggerMiddleware} from './loggerMiddleware';
import {authReducer} from './Auth/reducer';
import {authMiddleware} from './Auth/middleware';
import type {AppState} from './types';

const rootReducer = combineReducers<AppState>({contacts: contactsListReducer, auth: authReducer});
const middlewareEnhancer = applyMiddleware(loggerMiddleware, contactsListMiddleware, authMiddleware);

export const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(middlewareEnhancer));
