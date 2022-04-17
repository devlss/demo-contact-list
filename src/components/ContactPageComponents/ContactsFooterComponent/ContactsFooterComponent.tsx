import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Pagination} from 'react-bootstrap';
import {createSelector} from 'reselect';
import {setIsErrorAction} from '../../../store/Auth/actions';
import {getContactsRequest} from '../../../store/Contacts/actions';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {CHUNK_SIZE} from '../../../params';
import type {AppState} from '../../../store/types';
import type {ContactsFooterComponentProps} from './ContactsFooterComponent.types';

import './ContactsFooterComponent.scss';

/**
 * Размер списка номеров страниц влева и вправо от текущей
 */
const PAGE_RADIUS = 2;

const contactsCountSelector = ({contacts}: AppState) => contacts.count;
const pagesSelector = createSelector(contactsCountSelector, (contactsCountSelector) => Math.ceil(contactsCountSelector / CHUNK_SIZE));

export const ContactsFooterComponent: FC<ContactsFooterComponentProps> = () => {
	const dispatch = useAppDispatch();
	const pages = useAppSelector(pagesSelector);
	const [page, setPage] = useState(1);

	const pageItems = useMemo(() => {
		const result: JSX.Element[] = [];
		for (let i = Math.max(page - PAGE_RADIUS, 1); i <= Math.min(page + PAGE_RADIUS, pages); i++) {
			result.push(
				<Pagination.Item
					key={i}
					active={i === page}
					onClick={() => {
						if (i !== page) {
							setPage(i);
						}
					}}
				>
					{i}
				</Pagination.Item>
			);
		}
		return result;
	}, [pages, page]);

	const isNearFirst = page - 1 <= PAGE_RADIUS;
	const isNearLast = pages - page <= PAGE_RADIUS;
	const firstPageItem = useMemo(
		() =>
			!isNearFirst && (
				<>
					<Pagination.Item
						onClick={() => {
							if (!isNearFirst) {
								setPage(1);
							}
						}}
					>
						{1}
					</Pagination.Item>
					<Pagination.Ellipsis disabled />
				</>
			),

		[isNearFirst]
	);

	const lastPageItem = useMemo(
		() =>
			!isNearLast && (
				<>
					<Pagination.Ellipsis disabled />
					<Pagination.Item
						onClick={() => {
							if (!isNearLast) {
								setPage(pages);
							}
						}}
					>
						{pages}
					</Pagination.Item>
				</>
			),

		[isNearLast, pages]
	);

	const contactsRequest = useCallback(async () => {
		try {
			await dispatch(getContactsRequest(page));
		} catch (error) {
			dispatch(setIsErrorAction(true));
		}
	}, [dispatch, page]);

	useEffect(() => {
		contactsRequest();
	}, [contactsRequest]);

	return (
		<footer className="contacts-footer d-flex justify-content-center pt-3 px-3 px-md-5 border-top">
			<Pagination>
				{firstPageItem} {pageItems} {lastPageItem}
			</Pagination>
		</footer>
	);
};
