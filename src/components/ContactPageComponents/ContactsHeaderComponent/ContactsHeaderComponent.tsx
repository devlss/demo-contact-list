import {FC} from 'react';
import type {ContactsHeaderComponentProps} from './ContactsHeaderComponent.types';

import './ContactsHeaderComponent.scss';

export const ContactsHeaderComponent: FC<ContactsHeaderComponentProps> = () => {
	return (
		<header className="contacts-header d-flex justify-content-center pt-3 px-md-5 border-bottom">
			<h1>HELLO WORLD</h1>
		</header>
	);
};
