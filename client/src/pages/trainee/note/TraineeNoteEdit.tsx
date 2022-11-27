import { Container } from 'react-bootstrap';

import TraineeNoteForm from './TraineeNoteForm';
import { useNote } from './NoteLayout';

function EditNote() {
  const note = useNote();
  return (
    <>
      <Container>
        <h2 className='text-dark text-left mb-2'>Edit Note</h2>
      </Container>
      <TraineeNoteForm
        courseName={note.courseName}
        lessonId={note.lessonId}
        markdown={note.markdown}
        tags={note.tags}
        title={note.title}
      />
    </>
  );
}

export default EditNote;
