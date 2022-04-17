import {FC} from 'react';
import {useFormikContext} from 'formik';
import {Form, InputGroup} from 'react-bootstrap';
import {AppInputComponentProps} from '.';

export const AppInputComonent: FC<AppInputComponentProps> = ({field, type = 'text', label, logo, ...rest}) => {
	const {values, touched, errors, handleChange} = useFormikContext<{[fiels: string]: string}>();

	return (
		<Form.Group className="form-group">
			<Form.Label>{label}</Form.Label>
			<InputGroup className="mb-3">
				{logo && <InputGroup.Text id="basic-addon1">{logo}</InputGroup.Text>}
				<Form.Control
					type={type}
					name={field}
					value={values[field]}
					onChange={handleChange}
					isValid={touched[field] && !errors[field]}
					isInvalid={touched[field] && !!errors[field]}
					{...rest}
				/>
				<Form.Control.Feedback type="invalid" tooltip>
					{errors[field]}
				</Form.Control.Feedback>
			</InputGroup>
		</Form.Group>
	);
};
