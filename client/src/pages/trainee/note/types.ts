export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};
export type Tag = {
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagLabels: string[];
};
