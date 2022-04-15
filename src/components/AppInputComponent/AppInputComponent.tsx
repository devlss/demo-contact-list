import {FC} from 'react';
import {useFormikContext} from 'formik';
import {Form} from 'react-bootstrap';

interface AppInputComponentProps {
	field: string;
	type?: 'text' | 'password';
}

export const AppInputComonent: FC<AppInputComponentProps> = ({field, type = 'text'}) => {
	const {values, touched, errors, handleChange} = useFormikContext<{[fiels: string]: string}>();

	return (
		<Form.Group className="form-group">
			<Form.Label>Login</Form.Label>
			<Form.Control
				type={type}
				name={field}
				value={values[field]}
				onChange={handleChange}
				isValid={touched[field] && !errors[field]}
				isInvalid={touched[field] && !!errors[field]}
			/>
			<Form.Control.Feedback type="invalid" tooltip>
				{errors[field]}
			</Form.Control.Feedback>
		</Form.Group>
	);
};
