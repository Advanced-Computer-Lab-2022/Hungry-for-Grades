import {
  Navigate,
  Outlet,
  useOutletContext,
  useParams
} from 'react-router-dom';

import { type INote } from '@interfaces/note.interface';

type NoteLayoutProps = {
  notes: INote[];
};

export function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find(n => n.id === id);

  if (note == null) return <Navigate replace to='/' />;

  return <Outlet context={note} />;
}

export function useNote() {
  return useOutletContext<INote>();
}
