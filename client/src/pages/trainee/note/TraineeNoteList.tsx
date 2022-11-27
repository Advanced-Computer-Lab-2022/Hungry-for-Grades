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
  UseTraineeNoteStoreNotes,
  UseTraineeNoteStoreGetCourseNames
} from '@store/noteStore';
type SimplifiedNote = {
  tags: ITag[];
  title: string;
  id: string;
  courseName: string | undefined;
};

function NoteCard({ id, title, tags, courseName }: SimplifiedNote) {
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

          {courseName && (
            <span className='fs-6'>
              {
                <Badge className='text-truncate bg-secondary'>
                  {courseName}
                </Badge>
              }
            </span>
          )}
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
  const courseNames = UseTraineeNoteStoreGetCourseNames()();
  const [showSettings, setShowSettings] = useState(false);

  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [selectedCourseNames, setSelectedCourseNames] = useState<string[]>([]);
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
          )) &&
        (selectedCourseNames.length === 0 ||
          selectedCourseNames.every(
            courseName => note.courseName === courseName
          ))
      );
    });
  }, [notes, title, selectedTags, selectedCourseNames]);

  return (
    <Container className='my-3'>
      <Row className='align-items-center mb-4'>
        <Col>
				<h2 className='text-dark text-left mb-2'>Notes</h2>
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
          <Col>
            <Form.Group controlId='courses'>
              <Form.Label>Courses</Form.Label>
              <ReactSelect
                isMulti
                options={
                  courseNames?.map(course => {
                    return { label: course, value: course };
                  }) ?? []
                }
                value={
                  courseNames?.map(course => {
                    return { label: course, value: course };
                  }) ?? []
                }
                onChange={function onChange(courses) {
                  setSelectedCourseNames(
                    courses?.map(course => {
                      return course.value;
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
            <NoteCard
              courseName={note.courseName}
              id={note.id}
              tags={note.tags}
              title={note.title}
            />
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
        handleClose={function close() {
          setShowSettings(false);
        }}
        show={showSettings}
      />
    </Container>
  );
}

export default NoteList;
