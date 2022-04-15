import {AxiosResponse} from 'axios';
import {ax} from './init';
import type {IApiContact, IContact} from './types';

/**
 * Запрос списка записей
 * @param page    Номер страницы запроса
 * @param search  Строка для поиска в записях
 * @return        Кортеж [Выборка записей, количество всего записей]
 */
export async function apiGetContacts(page = 1, search = ''): Promise<[[IApiContact], number]> {
	const response = await ax.get<[IApiContact]>('/contacts', {
		params: {
			_page: page,
			_limit: 20,
			q: search
		}
	});

	return [response.data, getCount(response)];
}

/**
 * Запрос создания контакта на сервере
 * @param contact  Информация о записи
 * @returns        Кортеж [Созданный контакт, количество всего записей]
 */
export async function apiPostContact(contact: IContact): Promise<[IApiContact, number]> {
	const response = await ax.post<IApiContact>('/contacts', {contact});

	return [response.data, getCount(response)];
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
 * @returns    Количество всего записей
 */
export async function apiDeleteContact(id: number): Promise<number> {
	const response = await ax.delete<boolean>(`/contacts/${id}`);

	return getCount(response);
}

/**
 * Функция помощник для получения количества записей на сервере из заголовка
 * @param response  Объект ответа Axios
 * @returns         Количество записей на сервере
 */
function getCount(response: AxiosResponse) {
	return Number.parseInt(response.headers["X-Total-Count"]) || 0;
}
