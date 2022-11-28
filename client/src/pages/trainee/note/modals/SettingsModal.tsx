import { Modal, Stack, Form } from 'react-bootstrap';

type SettingsModalProps = {
  show: boolean;
  handleClose: () => void;
};

function SettingsModal({ handleClose, show }: SettingsModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2} />
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
