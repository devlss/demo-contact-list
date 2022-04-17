export interface AppInputComponentProps {
	field: string;
	type?: 'text' | 'password' | 'email' | 'tel';
	label: string;
	logo?: string;
	[rest: string]: unknown;
}
