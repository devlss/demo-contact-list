import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getAuthKey} from '../auth/authHelper';

const API_URL = new URL(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/api`);

/**
 * Клиент для json-server API
 */
export const ax = axios.create({baseURL: API_URL.href});
ax.interceptors.request.use(requestHandler);
ax.interceptors.response.use(responseHandler, responseErrorHandler);

/**
 * Перехватчик запросов на сервер. Позволяет выполнять обработку всех запросов
 * до отправки в сетевой стэк
 * @param request   Объект с конфигурацией запроса на сервер
 */
function requestHandler(request: AxiosRequestConfig): AxiosRequestConfig {
	// eslint-disable-next-line no-console
	// console.debug('[API req]', request);
	setAuthHeader(request);

	return request;
}

/**
 * Перехватчик ответов от сервера. Позволяет выполнять обработку всех ответов
 * до возвращения в промис вызвавшего метода
 * @param response  Объект ответ от сервера
 */
function responseHandler<T>(response: AxiosResponse<T>): AxiosResponse<T> {
	// eslint-disable-next-line no-console
	// console.debug('[API resp]', response);

	return response;
}

/**
 * Перехватчик ошибок от сервера. Позволяет выполнять обработку всех ошибок,
 * до возвращения в промис вызвавшего метода
 * @param responseError  Объект ошибки от сервера
 */
function responseErrorHandler(responseError: AxiosError<unknown>): Promise<number> {
	// eslint-disable-next-line no-console
	console.error('[API error]', responseError.response);

	return Promise.reject(responseError.response?.status);
}

/**
 * Установка заголовка простой аутентификации
 * @param request   Объект с конфигурацией запроса на сервер
 */
function setAuthHeader(request: AxiosRequestConfig) {
	const AuthKey = getAuthKey();
	if (AuthKey) {
		if (!request.headers) {
			request.headers = {};
		}
		request.headers.Authorization = 'Basic ' + AuthKey;
	}
}
