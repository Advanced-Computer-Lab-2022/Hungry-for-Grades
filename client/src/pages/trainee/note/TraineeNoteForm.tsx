import { FormEvent, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CreatableReactSelect from 'react-select/creatable';

import { type INote, type ITag } from '@interfaces/note.interface';
import {
  UseTraineeNoteStoreCreateNote,
  UseTraineeNoteStoreTags,
  UseTraineeNoteStoreCreateTag,
  UseTraineeNoteStoreUpdateNote
} from '@store/noteStore';

function TraineeNoteForm({
  title = '',
  courseName = '',
  lessonId = '',
  tags = [],
  id = '',
  markdown = ''
}: Partial<INote>) {
  const [searchParams] = useSearchParams();
  const createNote = UseTraineeNoteStoreCreateNote();
  const updateNode = UseTraineeNoteStoreUpdateNote();
  const createTag = UseTraineeNoteStoreCreateTag();
  const availableTags = Array.from(UseTraineeNoteStoreTags());
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<ITag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    title = titleRef?.current?.value || '';
    markdown = markdownRef?.current?.value || '';

    if (title && markdown && selectedTags) {
      const note = {
        title,
        markdown,
        tags: selectedTags,
        courseName: searchParams.get('courseName') || courseName,
        lessonId: searchParams.get('lessonId') || lessonId
      };
      if (id === '') {
        createNote(note);
      } else {
        const newNote = {
          ...note,
          id
        };
        updateNode(newNote);
      }

      navigate('..');
    }
  }

  return (
		<div style={{
			backgroundColor: '#f8f9fa'
		}} className='py-5'>
    <Container  >
      <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control ref={titleRef} required defaultValue={title} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                <CreatableReactSelect
                  isMulti
                  options={availableTags.map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
                  value={[...selectedTags].map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={function onChange(newTags) {
                    setSelectedTags(
                      newTags.map(tag => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  onCreateOption={function onCreate(label) {
                    const newTag = createTag(label);
                    setSelectedTags(prev => [...prev, newTag]);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId='markdown'>
            <Form.Label>Body</Form.Label>
            <Form.Control
              ref={markdownRef}
              required
              as='textarea'
              defaultValue={markdown}
              rows={15}
            />
          </Form.Group>
          <Stack className='justify-content-end' direction='horizontal' gap={2}>
            <Button type='submit' variant='primary'>
              Save
            </Button>
            <Link to='..'>
              <Button type='button' variant='outline-secondary'>
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </Container>
		</div>
  );
}
export default TraineeNoteForm;
