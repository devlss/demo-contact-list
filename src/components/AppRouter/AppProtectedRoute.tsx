import {FC, ReactElement, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const AppProtectedRoute: FC<{children: ReactElement}> = ({children}) => {
	const navigate = useNavigate();
	const pathname = useLocation().pathname;
	const auth = useAppSelector(({auth}) => auth);

	useEffect(() => {
		if (!auth.key) {
			navigate('/login', {state: {from: pathname, isError: auth.error}, replace: true});
		}
	}, [auth, navigate, pathname]);

	return children;
};
