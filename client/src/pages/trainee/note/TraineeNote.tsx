import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

import { BsFillTrashFill } from 'react-icons/bs';

import { useNote } from './NoteLayout';

import { UseTraineeNoteStoreDeleteNote } from '@store/noteStore';

// download notes as a pdf
function handleDownloadPDF(title: string, markdown: string) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'cm',
    format: [29.7, 21]
  });
  pdf.text(markdown, 1, 1);

  pdf.save(`${title}.pdf`);
}

function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const deleteNote = UseTraineeNoteStoreDeleteNote();

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
            <Link to={`edit`}>
              <Button variant='primary'>Edit</Button>
            </Link>
            <Button
              variant='outline-danger'
              onClick={function onDeleteTag() {
                deleteNote(note.id);
                navigate('..');
              }}
            >
              <BsFillTrashFill style={{ padding: '0 0 0.2rem' }} />
              Delete
            </Button>
            <Button
              variant='outline-primary'
              onClick={function onDownload() {
                handleDownloadPDF(note.title, note.markdown);
              }}
            >
              Download
            </Button>
            <Link to='..'>
              <Button variant='outline-secondary'>Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{note.markdown}</ReactMarkdown>
    </Container>
  );
}

export default Note;
