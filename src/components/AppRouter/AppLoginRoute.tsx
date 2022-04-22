import {FC, ReactElement, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from '../../store/hooks';

export const AppLoginRoute: FC<{children: ReactElement}> = ({children}) => {
	const navigate = useNavigate();
	const key = useAppSelector(({auth}) => auth.key);

	useEffect(() => {
		if (key) {
			navigate('/contacts', {replace: true});
		}
	}, [key, navigate]);

	return children;
};
