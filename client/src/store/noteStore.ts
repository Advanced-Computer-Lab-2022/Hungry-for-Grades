/* eslint-disable security/detect-object-injection */
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import {
  type INote,
  type ITag,
  type INoteData
} from '@interfaces/note.interface';

type INoteStore = {
  notes: INote[];
  tags: ITag[];
  backgroundUrl: string;
  setBackgroundUrl: (backgroundUrl: string) => void;
  setNotes: (notes: INote[]) => void;
  createNote: (
    note: INoteData,
    lessonId?: string,
    courseName?: string
  ) => INote;
  getNotesByCourseNameAndLessonId: (
    courseName?: string,
    lessonId?: string
  ) => INote[];
  updateNote: (note: Partial<INote>) => void;
  deleteNote: (id: string) => void;
  getCourseNames: () => string[];

  searchNoteById: (id: string | undefined) => INote | null;
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
        backgroundUrl: '',
        createNote: (note: INoteData) => {
          const { notes } = get();
          const newNote = {
            ...note,
            id: uuidv4()
          };
          const newNotes = [...notes, newNote];
          set({ notes: newNotes });

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
        setNotes: (notes: INote[]) => {
          let tags: ITag[] = [];
          notes.forEach(note => {
            tags = [...tags, ...note.tags];
          });
          set({ notes, tags });
        },
        deleteNote: (id: string) => {
          const { notes } = get();
          const newNotes = [...notes].filter(note => note.id !== id);
          set({ notes: newNotes });
        },
        deleteTag: (id: string) => {
          const { tags, notes } = get();
          const newTags = [...tags].filter(tag => tag.id !== id);
          const newNotes = [...notes].map(note => {
            if (note.tags) {
              const updatedTags = note.tags.filter(tag => tag.id !== id);
              return {
                ...note,
                tags: updatedTags
              };
            }
            return {
              ...note
            };
          });

          set({ tags: newTags, notes: newNotes });
        },
        updateNote: (note: Partial<INote>) => {
          const { notes } = get();
          console.log(note);
          const newNotes = [...notes].map(n =>
            n.id === note.id ? { ...n, ...note } : n
          );
          console.log(newNotes);
          set({ notes: newNotes });
        },
        updateTag: (tag: Partial<ITag>) => {
          const { tags, notes } = get();
          const newTags = [...tags].map(t =>
            t.id === tag.id ? { ...t, ...tag } : t
          );
          const newNotes = [...notes].map(note => {
            if (note.tags) {
              const updatedTags = note.tags.map(t =>
                t.id === tag.id ? { ...t, ...tag } : t
              );
              return {
                ...note,
                tags: updatedTags
              };
            }
            return {
              ...note
            };
          });

          set({ tags: newTags, notes: newNotes });
        },
        searchNoteById: id => {
          if (!id) return null;
          const { notes } = get();
          const newNotes = notes?.filter(note => note.id === id);
          return newNotes && newNotes.length > 0
            ? (newNotes[0] as INote)
            : null;
        },
        searchNoteByTitle: (title: string) => {
          const { notes } = get();
          return notes.filter(note => note.title === title);
        },
        searchNoteByCourseName: (name: string) => {
          const { notes } = get();
          return notes.filter(note => note.courseName === name);
        },
        getCourseNames: () => {
          const { notes } = get();
          return notes
            .map(note => note.courseName)
            .filter(
              course => course !== undefined && course !== ''
            ) as string[];
        },
        getNotesByCourseNameAndLessonId: (
          courseName?: string,
          lessonId?: string
        ) => {
          const { notes } = get();
          return notes.filter(
            note =>
              (!courseName ||
                (note.courseName && note.courseName === courseName)) &&
              (!lessonId || (note.lessonId && note.lessonId === lessonId))
          );
        },
        setBackgroundUrl: (backgroundUrl: string) => {
          set({ backgroundUrl });
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
export const UseTraineeNoteStoreSetNotes = () =>
  useTraineeNoteStore(state => state.setNotes); //To set the Notes

export const UseTraineeNoteStoreNotesByCourseandLessonId = () =>
  useTraineeNoteStore(state => state.getNotesByCourseNameAndLessonId); //To get the Notes By Course and Lesson
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

export const UseTraineeNoteStoreGetCourseNames = () =>
  useTraineeNoteStore(state => state.getCourseNames);
export const UseTraineeNoteStoreNoteSearchByCourseName = () =>
  useTraineeNoteStore(state => state.searchNoteByCourseName); //To search a Note by Course Name
export const UseTraineeNoteStoreBackgroundUrl = () =>
  useTraineeNoteStore(state => state.backgroundUrl); // To Background Url
export const UseTraineeNoteStoreSetBackgroundUrl = () =>
  useTraineeNoteStore(state => state.setBackgroundUrl); //To set Background Url
