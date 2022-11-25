/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import {
  type INote,
  type ITag,
  type INoteData
} from '@/interfaces/note.interface';

type INoteStore = {
  notes: INote[];
  tags: ITag[];
  createNote: (
    note: INoteData,
    lessonId?: string,
    courseName?: string
  ) => INote;
  updateNote: (note: Partial<INote>) => void;
  deleteNote: (id: string) => void;
  searchNoteById: (id: string) => INote[];
  searchNoteByTitle: (name: string) => INote[];
  searchNoteByCourseName: (name: string) => INote[];
  createTag: (tagLabel: string) => ITag;
  updateTag: (tag: Partial<ITag>) => void;
  deleteTag: (id: string) => void;
};
const STORAGE_KEYS_PREFIX = import.meta.env.VITE_STORAGE_KEYS_PREFIX;

export const useTraineeNoteStore = create<
  INoteStore,
  [['zustand/devtools', never], ['zustand/persist', INoteStore]]
>(
  devtools(
    persist(
      (set, get) => ({
        notes: [],
        tags: [],
        createNote: (note: INoteData) => {
          const { notes } = get();
          const newNote = {
            ...note,
            id: uuidv4()
          };
          const newNotes = [...Array.from(notes), newNote];
          set({ notes: newNotes });
          console.log('Note created successfully');
          console.log(newNotes);
          return newNote;
        },
        createTag: (tagLabel: string) => {
          const { tags } = get();
          const newTag = {
            label: tagLabel,
            id: uuidv4()
          };
          const newTags = [...tags, newTag];
          set({ tags: newTags });
          return newTag;
        },
        deleteNote: (id: string) => {
          const { notes } = get();
          const newNotes = [...notes].filter(note => note.id !== id);
          set({ notes: newNotes });
        },
        deleteTag: (id: string) => {
          const { tags } = get();
          const newTags = [...tags].filter(tag => tag.id !== id);
          set({ tags: newTags });
        },
        updateNote: (note: Partial<INote>) => {
          const { notes } = get();
          const newNotes = [...notes].map(n =>
            n.id === note.id ? { ...n, ...note } : n
          );

          set({ notes: newNotes });
        },
        updateTag: (tag: Partial<ITag>) => {
          const { tags } = get();
          const newTags = [...tags].map(t =>
            t.id === tag.id ? { ...t, ...tag } : t
          );
          set({ tags: newTags });
        },
        searchNoteById: (id: string) => {
          const { notes } = get();
          return notes.filter(note => note.id === id);
        },
        searchNoteByTitle: (title: string) => {
          const { notes } = get();
          return notes.filter(note => note.title === title);
        },
        searchNoteByCourseName: (name: string) => {
          const { notes } = get();
          return notes.filter(note => note.courseName === name);
        }
      }),
      {
        name: (STORAGE_KEYS_PREFIX + 'trainee-note-store').toUpperCase(),
        getStorage: () => localStorage
      }
    )
  )
);

export const UseTraineeNoteStoreNotes = () =>
  useTraineeNoteStore(state => state.notes); //To get the Notes
export const UseTraineeNoteStoreTags = () =>
  useTraineeNoteStore(state => state.tags); //To get the Tags
export const UseTraineeNoteStoreCreateNote = () =>
  useTraineeNoteStore(state => state.createNote); //To create a Note
export const UseTraineeNoteStoreCreateTag = () =>
  useTraineeNoteStore(state => state.createTag); //To create a Tag
export const UseTraineeNoteStoreDeleteNote = () =>
  useTraineeNoteStore(state => state.deleteNote); //To delete a Note
export const UseTraineeNoteStoreDeleteTag = () =>
  useTraineeNoteStore(state => state.deleteTag); //To delete a Tag
export const UseTraineeNoteStoreUpdateNote = () =>
  useTraineeNoteStore(state => state.updateNote); //To update a Note
export const UseTraineeNoteStoreUpdateTag = () =>
  useTraineeNoteStore(state => state.updateTag); //To update a Tag
export const UseTraineeNoteStoreNoteSearchById = () =>
  useTraineeNoteStore(state => state.searchNoteById); //To search a Note by id
export const UseTraineeNoteStoreNoteSearchByTitle = () =>
  useTraineeNoteStore(state => state.searchNoteByTitle); //To search a Note by title

export const UseTraineeNoteStoreNoteSearchByCourseName = () =>
  useTraineeNoteStore(state => state.searchNoteByCourseName); //To search a Note by Course Name
