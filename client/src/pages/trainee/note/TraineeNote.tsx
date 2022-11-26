import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import { useNote } from './useNoteLayout';

import { UseTraineeNoteStoreDeleteTag } from '@store/noteStore';
export function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const deleteTag = UseTraineeNoteStoreDeleteTag();

  return (
    <Container className='my-3'>
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
          <Stack direction='horizontal' gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button
              variant='outline-danger'
              onClick={function onDeleteTag() {
                deleteTag(note.id);
                navigate('/');
              }}
            >
              Delete
            </Button>
            <Link to='/'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </Container>
  );
}
