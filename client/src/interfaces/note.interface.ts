export interface INote extends INoteData {
  id: string;
}

export interface INoteData {
  title: string;
  markdown: string;
  lessonId?: string;
  courseName?: string;
  tags: ITag[];
}

export interface ITag {
  id: string;
  label: string;
}

export interface IRawNote extends IRawNoteData {
  id: string;
}

export interface IRawNoteData {
  title: string;
  markdown: string;
  tagIds: string[];
}
