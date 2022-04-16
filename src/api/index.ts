import {AxiosResponse} from 'axios';
import {ax} from './init';
import type {IApiContact, IApiGetOptions, IContact} from './types';

/**
 * Запрос списка записей
 * @param options Параметры запроса
 * @return        Кортеж [Выборка записей, количество всего записей]
 */
export async function apiGetContacts(options: IApiGetOptions): Promise<[[IApiContact], number]> {
	const response = await ax.get<[IApiContact]>('/contacts', {
		params: {
			_start: options.start,
			_end: options.end,
			_page: options.page,
			_limit: options.limit,
			_sort: options.sort,
			_order: options.order,
			q: options.query
		}
	});

	return [response.data, getCount(response)];
}

/**
 * Запрос создания контакта на сервере
 * @param contact  Информация о записи
 * @returns        Созданный контакт
 */
export async function apiPostContact(contact: IContact): Promise<IApiContact> {
	const response = await ax.post<IApiContact>('/contacts', {contact});

	return response.data;
}

/**
 * Запрос изменения контакта на сервере
 * @param contact  Информация о записи
 * @param id       ID контакта
 * @returns        Измененный контакт
 */
export async function apiPutContact(contact: IContact, id: number): Promise<IApiContact> {
	const response = await ax.put<IApiContact>(`/contacts/${id}`, {contact});

	return response.data;
}

/**
 * Запрос удаления контакта на сервере
 * @param id   ID контакта
 */
export async function apiDeleteContact(id: number): Promise<void> {
	await ax.delete<boolean>(`/contacts/${id}`);

	return;
}

/**
 * Функция помощник для получения количества записей на сервере из заголовка
 * @param response  Объект ответа Axios
 * @returns         Количество записей на сервере
 */
function getCount(response: AxiosResponse) {
	return Number.parseInt(response.headers['x-total-count']) || 0;
}
