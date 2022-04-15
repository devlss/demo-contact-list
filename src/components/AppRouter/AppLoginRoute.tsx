import {FC, PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const AppLoginRoute: FC<PropsWithChildren<{}>> = ({children}) => {
	const key = useAppSelector(({auth}) => auth.key);

	return <>{key ? <Navigate to="/" replace /> : children}</>;
};
