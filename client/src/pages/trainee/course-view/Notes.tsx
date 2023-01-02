import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Col,
  Collapse,
  Container,
  Form,
  Row,
  Stack
} from 'react-bootstrap';
import { AiFillEdit, AiFillSetting, AiOutlineClose } from 'react-icons/ai';
import ReactSelect from 'react-select';

import { BsFillTrashFill } from 'react-icons/bs';

import { MdSaveAlt } from 'react-icons/md';

import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

import EditTagsModal from '../note/modals/EditTagsModal';
import SettingsModal from '../note/modals/SettingsModal';

import NoteCard from '../note/TraineeNoteCard';

import { handleDownloadPDF } from '../note/TraineeNote';

import NoteForm from './NoteForm';

import { INote, type ITag } from '@interfaces/note.interface';

import {
  UseTraineeNoteStoreTags,
  UseTraineeNoteStoreGetCourseNames,
  UseTraineeNoteStoreNotesByCourseandLessonId,
  UseTraineeNoteStoreDeleteNote
} from '@store/noteStore';

type NoteListProps = {
  lessonId: string;
  courseName: string;
};

function Note({ note, onClose }: { note: INote; onClose: () => void }) {
  const deleteNote = UseTraineeNoteStoreDeleteNote();
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <Collapse in={editMode}>
        <Col>
          <NoteForm
            {...note}
            onClose={function close() {
              setEditMode(false);
              onClose();
            }}
          />
        </Col>
      </Collapse>
      <Container
        className='my-3'
        style={{
          backgroundColor: '#fafafa',
          filter: 'drop-shadow(0 0 0.1rem #eee)',
          borderRadius: '0.25rem',
          padding: '1.5rem',
          boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <Row className='align-items-center mb-4'>
          <Col>
            <h1>{note.title}</h1>
            {note.tags.length > 0 && (
              <Stack className='flex-wrap' direction='horizontal' gap={1}>
                {note.tags.map(tag => (
                  <Badge key={tag.id} className='text-truncate'>
                    {tag.label}
                  </Badge>
                ))}
              </Stack>
            )}
          </Col>
          <Col xs='auto'>
            <Stack direction='horizontal' gap={1}>
              <Button
                style={{
                  fontSize: '1.2rem',
                  color: 'black'
                }}
                variant=''
                onClick={function open() {
                  setEditMode(true);
                }}
              >
                <AiFillEdit />
              </Button>

              <Button
                style={{
                  fontSize: '1.1rem',
                  color: 'black'
                }}
                variant=''
                onClick={function onDownload() {
                  handleDownloadPDF(note.title, note.markdown);
                }}
              >
                <MdSaveAlt
                  style={{
                    fontSize: '1.3rem',
                    color: 'black'
                  }}
                />
              </Button>
              <Button
                variant=''
                onClick={function onDeleteNote() {
                  deleteNote(note.id);
                  onClose();
                }}
              >
                <BsFillTrashFill
                  style={{
                    fontSize: '1.1rem',
                    color: 'black',
                    margin: '0'
                  }}
                />
              </Button>
              <Button
                style={{
                  padding: '0 0 0.1rem',
                  fontSize: '1.3rem',
                  color: '#880306'
                }}
                variant=''
                onClick={onClose}
              >
                <AiOutlineClose />
              </Button>
            </Stack>
          </Col>
        </Row>
        <div
          className='container'
          style={{
            backgroundColor: '#fefefe',
            filter: 'drop-shadow(0 0 0.1rem #eee)',
            borderRadius: '0.25rem',
            padding: '1rem',
            boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)'
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.markdown}
          </ReactMarkdown>
        </div>
      </Container>
    </>
  );
}

function Notes({ lessonId, courseName }: Partial<NoteListProps>) {
  const notes = UseTraineeNoteStoreNotesByCourseandLessonId()(
    courseName,
    lessonId
  );
  const [selectedNote, setSelectedNote] = useState<INote>();
  const [createNote, setCreateNote] = useState(false);
  const availableTags = UseTraineeNoteStoreTags();

  const courseNames = UseTraineeNoteStoreGetCourseNames()();
  console.log(courseNames);

  const [showSettings, setShowSettings] = useState(false);

  const [selectedTags, setSelectedTags] = useState<ITag[]>([]);
  const [selectedCourseNames, setSelectedCourseNames] = useState<string[]>(
    courseName ? [courseName] : []
  );
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
  function onCloseForm() {
    setCreateNote(false);
  }
  function onCloseNote() {
    setSelectedNote(undefined);
  }

  return (
    <Container className='my-3'>
      <Row className='align-items-center mb-4'>
        <Col>
          <h2 className='text-dark text-left mb-2 text-truncate'>
            {courseName ? 'Course ' : ''} Notes
          </h2>
        </Col>

        <Col xs='auto'>
          <Stack direction='horizontal' gap={2}>
            <Button
              variant='primary'
              onClick={function onCreateNote() {
                setCreateNote(true);
              }}
            >
              Create
            </Button>
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
      <Row className='align-items-center mb-4'>
        {createNote && (
          <Col>
            <NoteForm
              courseName={courseName}
              lessonId={lessonId}
              onClose={onCloseForm}
            />
          </Col>
        )}
      </Row>{' '}
      <Row className='align-items-center mb-4'>
        {selectedNote && (
          <Col>
            <Note note={selectedNote} onClose={onCloseNote} />
          </Col>
        )}
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder='Search notes by title'
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
                placeholder='Search notes by tags'
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
                placeholder='Search notes by courses'
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
      <Row
        className='g-3 d-flex justify-content-center'
        lg={3}
        sm={2}
        style={{
          textAlign: 'center'
        }}
        xl={4}
        xs={1}
      >
        {filteredNotes?.map(note => (
          <Col
            key={note.id}
            onClick={function onClick() {
              setSelectedNote(note);
            }}
          >
            <NoteCard
              courseName={note.courseName}
              id={note.id}
              tags={note.tags}
              title={note.title}
            />
          </Col>
        ))}
        {filteredNotes?.length === 0 && (
          <div className='mt-5'>
            <div
              className='alert alert-danger d-flex justify-content-center'
              role='alert'
            >
              No notes found
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
  );
}

export default Notes;
