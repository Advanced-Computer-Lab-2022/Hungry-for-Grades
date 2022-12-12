/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Stack, Form, Row, Col } from 'react-bootstrap';

import {
  UseTraineeNoteStoreSetBackgroundUrl,
  UseTraineeNoteStoreBackgroundUrl
} from '@store/noteStore';
type SettingsModalProps = {
  show: boolean;
  handleClose: () => void;
};

function SettingsModal({ handleClose, show }: SettingsModalProps) {
  const useTraineeNoteStoreSetBackgroundUrl =
    UseTraineeNoteStoreSetBackgroundUrl();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            <Row>
              <Col>
                <Form.Label>Theme</Form.Label>
                <Form.Control
                  type='text'
                  value={UseTraineeNoteStoreBackgroundUrl()}
                  onChange={function onChange(e) {
                    useTraineeNoteStoreSetBackgroundUrl(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SettingsModal;
