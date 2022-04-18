import {FC, useMemo} from 'react';
import {Pagination} from 'react-bootstrap';
import {setPageContactsAction} from '../../../store/Contacts/actions';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {contactsPageSelector, contactsPagesSelector} from '../../../store/Contacts/selectors';
import type {ContactsFooterComponentProps} from './ContactsFooterComponent.types';

import './ContactsFooterComponent.scss';

/**
 * Размер списка номеров страниц влева и вправо от текущей
 */
const PAGE_RADIUS = 2;

export const ContactsFooterComponent: FC<ContactsFooterComponentProps> = () => {
	const dispatch = useAppDispatch();
	const pages = useAppSelector(contactsPagesSelector);
	const page = useAppSelector(contactsPageSelector);

	const pageItems = useMemo(() => {
		const result: JSX.Element[] = [];
		for (let i = Math.max(page - PAGE_RADIUS, 1); i <= Math.min(page + PAGE_RADIUS, pages); i++) {
			result.push(
				<Pagination.Item
					key={i}
					active={i === page}
					onClick={() => {
						if (i !== page) {
							dispatch(setPageContactsAction(i));
						}
					}}
				>
					{i}
				</Pagination.Item>
			);
		}
		return result;
	}, [dispatch, pages, page]);

	const isNearFirst = page - 1 <= PAGE_RADIUS;
	const isNearLast = pages - page <= PAGE_RADIUS;
	const firstPageItem = useMemo(
		() =>
			!isNearFirst && (
				<Pagination.First
					onClick={() => {
						if (!isNearFirst) {
							dispatch(setPageContactsAction(1));
						}
					}}
				/>
			),

		[dispatch, isNearFirst]
	);

	const lastPageItem = useMemo(
		() =>
			!isNearLast && (
				<Pagination.Last
					onClick={() => {
						if (!isNearLast) {
							dispatch(setPageContactsAction(pages));
						}
					}}
				/>
			),

		[dispatch, isNearLast, pages]
	);

	return (
		<footer className="contacts-footer d-flex justify-content-center pt-3 px-3 px-md-5 border-top">
			<Pagination>
				{firstPageItem} {pageItems} {lastPageItem}
			</Pagination>
		</footer>
	);
};
