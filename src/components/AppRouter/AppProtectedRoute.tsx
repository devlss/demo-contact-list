import {FC, PropsWithChildren} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const AppProtectedRoute: FC<PropsWithChildren<{}>> = ({children}) => {
	const location = useLocation();
	const auth = useAppSelector(({auth}) => auth);

	return <>{auth.key ? children : <Navigate to="/login" state={{from: location, isError: auth.error}} replace />}</>;
};
