export interface IContact {
	name: string;
	phone: string;
	email: string;
}

export interface IApiContact extends IContact {
	id: number;
}

/**
 * Параметры GET запроса на сервер
 */
export interface IApiGetOptions {
	/**
	 * Начальная позиция
	 */
	start?: number;

	/**
	 * Конечная позиция
	 */
	end?: number;

	/**
	 * Номер страницы
	 */
	page?: number;

	/**
	 * d: Размер страницы (по умолчанию 20)
	 */
	limit?: number;

	/**
	 * d: Название поля для сортировки
	 */
	sort?: string;
	/**
	 * Направление сортировки
	 */
	order?: 'asc' | 'desc';

	/**
	 * d: Строка для поиска в записях
	 */
	query?: string;
}
