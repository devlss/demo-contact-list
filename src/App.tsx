import React from 'react';
import ThemeProvider from 'react-bootstrap/esm/ThemeProvider';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {AppRouter} from './components/AppRouter';
import {store} from './store';

export const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider breakpoints={['md']}>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};
