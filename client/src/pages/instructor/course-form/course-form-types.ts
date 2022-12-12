import { Level } from '@/enums/level.enum';
import {
  IAddCourseRequest,
  ICourseQuestion
} from '@/interfaces/course.interface';

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
  _id: string | undefined;
  description: string;
  duration: string;
  title: string;
  videoURL: string;
};

export type AnswerFormValues = {
  uid: string;
  value: string;
};

export type QuestionFormValues = {
  uid: string;
  _id: string | undefined;
  answer: string;
  options: AnswerFormValues[];
  question: string;
};

export type ExerciseFormValues = {
  uid: string;
  _id: string | undefined;
  title: string;
  questions: QuestionFormValues[];
};

export type SectionFormValues = {
  uid: string;
  _id: string | undefined;
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
  terms: boolean;
};

export type ExamFormValues = {
  questions: QuestionFormValues[];
};

export type CourseSubmitAction = (course: IAddCourseRequest) => Promise<void>;

export type ExamSubmitAction = (exam: ICourseQuestion[]) => Promise<void>;

export type CourseFormProps = {
  initialValues: CourseFormValues;
  isUpdating: boolean;
  submitAction: CourseSubmitAction;
};

export type ExamFormProps = {
  initialValues: ExamFormValues;
  submitAction: ExamSubmitAction;
};
