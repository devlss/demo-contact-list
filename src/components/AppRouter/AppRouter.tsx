import {FC} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {ContactsPage, LoginPage} from '../../pages';
import {AppProtectedRoute} from './AppProtectedRoute';
import type {RouterProps} from './AppRouter.types';

export const AppRouter: FC<RouterProps> = () => {
	return (
		<Routes>
			<Route
				path="/contacts"
				element={
					<AppProtectedRoute>
						<ContactsPage />
					</AppProtectedRoute>
				}
			/>
			<Route path="/login" element={<LoginPage />} />
			<Route path="*" element={<Navigate to="/contacts" />} />
		</Routes>
	);
};
