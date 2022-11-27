import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams
} from 'react-router-dom';

import { type INote } from '@interfaces/note.interface';
import {
UseTraineeNoteStoreNoteSearchById
}
from '@store/noteStore'

export function NoteLayout() {
  const { id } = useParams();
  const note = UseTraineeNoteStoreNoteSearchById()(id as string);

  if (note == null) return <Navigate replace to='/' />;

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<INote>();
}
