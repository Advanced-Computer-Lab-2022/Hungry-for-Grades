import { useMemo, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ReactSelect from 'react-select';

import EditTagsModal from './modals/EditTagsModal';
import SettingsModal from './modals/SettingsModal';

import NoteCard from './TraineeNoteCard';

import { type ITag } from '@interfaces/note.interface';

import {
  UseTraineeNoteStoreTags,
  UseTraineeNoteStoreGetCourseNames,
  UseTraineeNoteStoreNotesByCourseandLessonId
} from '@store/noteStore';

type NoteListProps = {
  lessonId: string;
  courseName: string;
};

function TraineeNoteList({ lessonId, courseName }: Partial<NoteListProps>) {
  const notes = UseTraineeNoteStoreNotesByCourseandLessonId()(
    courseName,
    lessonId
  );
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
            currentCourseName => note.courseName === currentCourseName
          ))
      );
    });
  }, [notes, title, selectedTags, selectedCourseNames]);

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container className='my-3'>
        <Row className='align-items-center mb-4'>
          <Col>
            <h2 className='text-dark text-left mb-2 text-truncate'>
              {courseName ? 'Course ' : ''} Notes
            </h2>
          </Col>
          <Col xs='auto'>
            <Stack direction='horizontal' gap={2}>
              <Link
                to={`/trainee/notes/form?courseName=${
                  courseName ?? ''
                }&lessonId=${lessonId ?? ''}`}
              >
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
                variant=''
                onClick={function open() {
                  setShowSettings(true);
                }}
              >
                <AiFillSetting
                  style={{
                    fontSize: '1.3rem',
                    color: '#6c757d'
                  }}
                />
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
                  placeholder='Search by title'
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
                  placeholder='Filter by tags'
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
            <Col className='col-12 col-md-6 col-lg-4'>
              <Form.Group controlId='courses'>
                <Form.Label>Courses</Form.Label>
                <ReactSelect
                  isMulti
                  options={
                    courseNames?.map(course => {
                      return { label: course, value: course };
                    }) ?? []
                  }
                  placeholder='Filter by course name'
                  value={
                    selectedCourseNames?.map(course => {
                      return { label: course, value: course };
                    }) ?? []
                  }
                  onChange={function onChange(coursesSelect) {
                    setSelectedCourseNames(() =>
                      coursesSelect?.map(course => {
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
          {filteredNotes?.map(note => (
            <Col key={note.id}>
              <Link to={`/trainee/notes/${note.id}`}>
                <NoteCard
                  courseName={note.courseName}
                  id={note.id}
                  tags={note.tags}
                  title={note.title}
                />
              </Link>
            </Col>
          ))}
          {filteredNotes?.length === 0 && (
            <div className='container mt-5'>
              <div
                className='alert alert-danger d-flex justify-content-center'
                role='alert'
              >
                No notes{' '}
                {notes && notes.length > 0 ? 'for this Course where found' : ''}
                found,
                <Link
                  to={`/trainee/notes/form?courseName=${
                    courseName ?? ''
                  }&lessonId=${lessonId ?? ''}`}
                >
                  <span className='alert-link'> Create Note</span>
                </Link>
              </div>
            </div>
          )}
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
    </div>
  );
}

export default TraineeNoteList;
