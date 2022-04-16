import {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {ContactsPage, LoginPage} from '../../pages';
import {ContactsModalProvider} from '../ContactModals';
import {AppLoginRoute} from './AppLoginRoute';
import {AppProtectedRoute} from './AppProtectedRoute';

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route
				path="/contacts"
				element={
					<AppProtectedRoute>
						<ContactsModalProvider>
							<ContactsPage />
						</ContactsModalProvider>
					</AppProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<AppLoginRoute>
						<LoginPage />
					</AppLoginRoute>
				}
			/>
			<Route path="*" element={<Navigate to="/contacts" />} />
		</Routes>
	);
};
