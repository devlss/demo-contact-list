export interface IContact {
	name: string;
	phone: string;
	email: string;
}

export interface IApiContact extends IContact {
	id: number;
}
