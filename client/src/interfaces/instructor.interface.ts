export interface Note extends NoteData {
  id: string;
}

export interface NoteData {
  title: string;
  tags: Tag[];
  markdown: string;
}

export interface Tag {
  label: string;
}

export interface RawNote extends RawNoteData {
  id: string;
}

export interface RawNoteData {
  title: string;
  markdown: string;
  tagLabels: string[];
}
