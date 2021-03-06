import {FC} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {ModalConsumer} from '.';

export const ModalConfirmComponent: FC<{}> = () => {
	const context = ModalConsumer();

	return context.state.type === 'delete' ? (
		<Modal show onHide={context.hideModal} backdrop="static" keyboard={false}>
			<Modal.Header closeButton>
				<Modal.Title>Delete confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				You are about to delete contact for user: <em className="text-danger">{context.state.contact.name}</em>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={context.hideModal}>
					Cancel
				</Button>
				<Button
					variant="danger"
					onClick={() => {
						if (context.state.type === 'delete') {
							context.state.callback(context.state.contact);
						}
						context.hideModal();
					}}
				>
					Ok
				</Button>
			</Modal.Footer>
		</Modal>
	) : (
		<></>
	);
};
