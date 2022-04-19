import {ReactNode} from "react";

export interface AppInputComponentProps {
	field: string;
	type?: 'text' | 'password' | 'email' | 'tel';
	label: string;
	logo?: string | ReactNode;
	[rest: string]: unknown;
}
