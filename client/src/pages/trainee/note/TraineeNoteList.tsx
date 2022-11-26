import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

import styles from './note-list.module.scss';

import EditTagsModal from './modals/EditTagsModal';
import SettingsModal from './modals/SettingsModal';

import { type ITag } from '@interfaces/note.interface';

import {
  UseTraineeNoteStoreTags,
  UseTraineeNoteStoreNotes
} from '@store/noteStore';
type SimplifiedNote = {
  tags: ITag[];
  title: string;
  id: string;
};

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      className={`h-100 text-reset text-decoration-none ${styles.card ?? ''}`}
      to={`/${id}`}
    >
      <Card.Body>
        <Stack
          className='align-items-center justify-content-center h-100'
          gap={2}
        >
          <span className='fs-5'>{title}</span>
          {tags.length > 0 && (
            <Stack
              className='justify-content-center flex-wrap'
              direction='horizontal'
              gap={1}
            >
              {tags?.map(tag => (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}

function NoteList() {
  const notes = UseTraineeNoteStoreNotes();
  const availableTags = UseTraineeNoteStoreTags();
  const [showSettings, setShowSettings] = useState(false);

  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [title, setTitle] = useState('');
  const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    return notes?.filter(note => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <Container className='my-3'>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack direction='horizontal' gap={2}>
            <Link to='/trainee/notes/form'>
              <Button variant='primary'>Create</Button>
            </Link>
            <Button
              variant='outline-secondary'
              onClick={function open() {
                setEditTagsModalIsOpen(true);
              }}
            >
              Edit Tags
            </Button>

            <Button
              variant='outline-secondary'
              onClick={function open() {
                setShowSettings(true);
              }}
            >
              Settings
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={function onChange(e) {
                  setTitle(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                options={
                  availableTags?.map(tag => {
                    return { label: tag.label, value: tag.id };
                  }) ?? []
                }
                value={
                  selectedTags?.map(tag => {
                    return { label: tag.label, value: tag.id };
                  }) ?? []
                }
                onChange={function onChange(tags) {
                  setSelectedTags(
                    tags?.map(tag => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row className='g-3' lg={3} sm={2} xl={4} xs={1}>
        {filteredNotes.map(note => (
          <Col key={note.id}>
            <NoteCard id={note.id} tags={note.tags} title={note.title} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        handleClose={function close() {
          setEditTagsModalIsOpen(false);
        }}
        show={editTagsModalIsOpen}
      />
      <SettingsModal
        show={showSettings}
        onClose={function close() {
          setShowSettings(false);
        }}
      />
    </Container>
  );
}

export default NoteList;
