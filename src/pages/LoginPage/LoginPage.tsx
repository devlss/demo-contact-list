import {FC, useCallback} from 'react';
import {useLocation} from 'react-router-dom';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {useAppDispatch} from '../../store/hooks';
import {loginAction} from '../../store/Auth/actions';
import {AppInputComonent} from '../../components/AppInputComponent';
import type {ILocationState, ILoginFormFields, LoginProps} from './LoginPage.types';

import './LoginPage.scss';

const loginInitialValues = {login: '', password: ''};

const loginValidationSchema = Yup.object().shape({
	login: Yup.string().min(4, 'Min length 4').max(16, 'Max length 16').required('Required'),
	password: Yup.string().min(6, 'Min length 6').max(16, 'Max length 16').required('Required')
});

export const LoginPage: FC<LoginProps> = () => {
	const dispatch = useAppDispatch();
	const locationState = useLocation().state as ILocationState;

	const submitHandler = useCallback(
		async (values: ILoginFormFields, {setSubmitting}: FormikHelpers<ILoginFormFields>) => {
			dispatch(loginAction(values.login, values.password));
			setSubmitting(false);
		},
		[dispatch]
	);

	return (
		<Container className="wrapper" as="main">
			<Card className="login-page col-12 col-md-4 shadow">
				<Card.Body className="p-4 p-md-5">
					<Card.Title as="h3">Please authenticate</Card.Title>
					<Card.Subtitle className={`mb-4 ${locationState && locationState.isError ? 'text-danger' : ''}`}>
						{locationState && locationState.isError ? 'Invalid credentials' : 'Enter credentials'}
					</Card.Subtitle>
					<Formik
						initialValues={loginInitialValues}
						validationSchema={loginValidationSchema}
						onSubmit={submitHandler}
						validateOnChange={true}
						validateOnBlur={false}
					>
						{({handleSubmit, isSubmitting}) => (
							<Form noValidate onSubmit={handleSubmit}>
								<Row className="mb-3">
									<AppInputComonent field="login" autoComplete="username" label="Username" />
								</Row>
								<Row className="mb-3">
									<AppInputComonent field="password" type="password" label="Password" autoComplete="current-password" />
								</Row>
								<Row className="mt-5 justify-content-center">
									<Col>
										<Button type="submit" variant="primary" disabled={isSubmitting} className="w-100">
											Login
										</Button>
									</Col>
								</Row>
							</Form>
						)}
					</Formik>
				</Card.Body>
			</Card>
		</Container>
	);
};
