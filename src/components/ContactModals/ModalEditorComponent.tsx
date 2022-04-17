import {Formik, FormikProps, FormikHelpers} from 'formik';
import {FC, useCallback, useRef} from 'react';
import {Button, Form, Modal, Row} from 'react-bootstrap';
import * as Yup from 'yup';
import {ModalConsumer} from '.';
import {IContact} from '../../api/types';
import {logoutAction} from '../../store/Auth/actions';
import {postContactRequest, putContactRequest} from '../../store/Contacts/actions';
import {useAppDispatch} from '../../store/hooks';
import {AppInputComonent} from '../AppInputComponent';

const loginInitialValues = {name: '', phone: '', email: ''};
const phoneRegexpSimple = /^\+7\d{10}$/gi;
const loginValidationSchema = Yup.object().shape({
	name: Yup.string().min(3, 'Min length 3').max(32, 'Max length 32').required('Required'),
	phone: Yup.string().matches(phoneRegexpSimple, 'Phone number is not valid'),
	email: Yup.string().email('Email format is not valid')
});

export const ModalEditorComponent: FC<{}> = () => {
	const context = ModalConsumer();
	const dispatch = useAppDispatch();
	const formRef = useRef<FormikProps<IContact>>(null);
	const type = context.state.type;
	const hideModal = context.hideModal;
	const contact = type === 'edit' && context.state.contact;

	const submitHandler = useCallback(
		async (values: IContact, {setSubmitting}: FormikHelpers<IContact>) => {
			try {
				if (type === 'edit' && contact) {
					dispatch(putContactRequest(contact.id, {name: values.name, phone: values.phone, email: values.email}));
				} else if (type === 'new') {
					dispatch(postContactRequest(values));
				}
			} catch (error) {
				if (error === 401) {
					dispatch(logoutAction());
				}
			} finally {
				setSubmitting(false);
				hideModal();
			}
		},
		[dispatch, type, contact, hideModal]
	);

	return type === 'edit' || type === 'new' ? (
		<Modal show onHide={context.hideModal} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Delete confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={contact || loginInitialValues}
					validationSchema={loginValidationSchema}
					onSubmit={submitHandler}
					validateOnChange={true}
					validateOnBlur={false}
					innerRef={formRef}
				>
					{({handleSubmit}) => (
						<Form noValidate onSubmit={handleSubmit}>
							<Row className="mb-3">
								<AppInputComonent field="name" label="Name" />
							</Row>
							<Row className="mb-3">
								<AppInputComonent field="phone" type="tel" label="Phone" />
							</Row>
							<Row className="mb-3">
								<AppInputComonent field="email" type="email" label="Email" />
							</Row>
						</Form>
					)}
				</Formik>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={context.hideModal}>
					Cancel
				</Button>
				<Button
					type="submit"
					variant="primary"
					onClick={() => {
						if (formRef.current) {
							formRef.current.handleSubmit();
						}
					}}
					disabled={formRef.current ? formRef.current.isSubmitting : undefined}
				>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	) : (
		<></>
	);
};
