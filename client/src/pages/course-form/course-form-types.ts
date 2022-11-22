import { Level } from '@/enums/level.enum';

let nextId = 1;

export function getUniqueId() {
  return `id-${nextId++}`;
}

export const languages = [
  'English',
  'German',
  'Arabic',
  'French',
  'Spanish',
  'Italian'
].sort();

export const levels = Object.values(Level);

export type LessonFormValues = {
  uid: string;
  description: string;
  duration: string;
  title: string;
  videoURL: string;
};

export type AnswerFormValues = {
  uid: string;
  value: string;
};

export type ExerciseFormValues = {
  uid: string;
  title: string;
  questions: {
    uid: string;
    answer: string;
    options: AnswerFormValues[];
    question: string;
  }[];
};

export type SectionFormValues = {
  uid: string;
  description: string;
  lessons: LessonFormValues[];
  exercises: ExerciseFormValues[];
  title: string;
};

export type OutlineFormValues = {
  uid: string;
  value: string;
};

export type CourseInfoFormValues = {
  title: string;
  description: string;
  language: string;
  level: string;
  price: string;
  previewVideoURL: string;
  thumbnail: string;
};

export type CourseFormValues = {
  info: CourseInfoFormValues;
  outline: OutlineFormValues[];
  sections: SectionFormValues[];
};
