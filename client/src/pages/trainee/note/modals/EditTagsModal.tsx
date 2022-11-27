import { Button, Modal, Stack, Col, Form, Row } from 'react-bootstrap';

import { type ITag } from '@interfaces/note.interface';

import {
  UseTraineeNoteStoreDeleteTag,
  UseTraineeNoteStoreUpdateTag
} from '@store/noteStore';

type EditTagsModalProps = {
  show: boolean;
  availableTags: ITag[];
  handleClose: () => void;
};
function EditTagsModal({
  availableTags,
  handleClose,
  show
}: EditTagsModalProps) {
  const onUpdateTag = UseTraineeNoteStoreUpdateTag();
  const onDeleteTag = UseTraineeNoteStoreDeleteTag();
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags?.map(tag => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type='text'
                    value={tag.label}
                    onChange={function onChage(e) {
                      onUpdateTag({ id: tag.id, label: e.target.value });
                    }}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    variant='outline-danger'
                    onClick={function onClick() {
                      onDeleteTag(tag.id);
                    }}
                  >
                    &times;
                  </Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTagsModal;
