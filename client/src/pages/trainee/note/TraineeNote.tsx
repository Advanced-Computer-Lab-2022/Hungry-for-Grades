import { Badge, Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import jsPDF from 'jspdf';

import { BsFillTrashFill } from 'react-icons/bs';

import { MdSaveAlt } from 'react-icons/md';

import { useNote } from './NoteLayout';

import { UseTraineeNoteStoreDeleteNote } from '@store/noteStore';

// download notes as a pdf
export function handleDownloadPDF(title: string, markdown: string) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'cm',
    format: [29.7, 21]
  });
  pdf.text(markdown, 1, 1);

  pdf.save(`${title}.pdf`);
}

export default function Note() {
  const note = useNote();
  const navigate = useNavigate();
  const deleteNote = UseTraineeNoteStoreDeleteNote();

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#f8f9fa'
      }}
    >
      <Container
        style={{
          backgroundColor: 'white',
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
            <Stack direction='horizontal' gap={2}>
              <Link to={`edit`}>
                <Button variant='primary'>Edit</Button>
              </Link>
              <Button
                variant='outline-danger'
                onClick={function onDeleteNote() {
                  deleteNote(note.id);
                  navigate('..');
                }}
              >
                <BsFillTrashFill style={{ padding: '0 0 0.2rem' }} />
                Delete
              </Button>

              <Link to='..'>
                <Button variant='outline-secondary'>Back</Button>
              </Link>
              <Button
                variant=''
                onClick={function onDownload() {
                  handleDownloadPDF(note.title, note.markdown);
                }}
              >
                <MdSaveAlt
                  style={{
                    fontSize: '1.3rem',
                    color: '#6c757d',
                    padding: '0 0 0.1rem'
                  }}
                />
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
    </div>
  );
}
