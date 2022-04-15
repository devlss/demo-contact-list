import {FC, PropsWithChildren} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const AppProtectedRoute: FC<PropsWithChildren<{}>> = ({children}) => {
	const location = useLocation();
	const key = useAppSelector(({auth}) => auth.key);

	return <>{key ? children : <Navigate to="/login" state={{from: location}} replace />}</>;
};
