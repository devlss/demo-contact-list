import {createSelector} from 'reselect';
import {CHUNK_SIZE} from '../../params';
import type {AppState} from '../types';

export const contactsListSelector = ({contacts}: AppState) => contacts.list;
export const contactsCountSelector = ({contacts}: AppState) => contacts.count;
export const contactsPageSelector = ({contacts}: AppState) => contacts.page;
export const contactsQuerySelector = ({contacts}: AppState) => contacts.query;
export const contactsPagesSelector = createSelector(contactsCountSelector, (contactsCountSelector) => Math.ceil(contactsCountSelector / CHUNK_SIZE));
export const contactsIsLastPageSelector = createSelector(
	contactsPagesSelector,
	contactsPageSelector,
	(contactsPagesSelector, contactsPageSelector) => contactsPagesSelector === contactsPageSelector
);
