import { object, string, number, array, StringSchema } from 'yup';

import { AnswerFormValues, languages, levels } from './course-form-types';

export const infoSchema = object().shape({
  title: string().required().min(4).max(100).label('Title'),
  description: string().required().min(20).max(500).label('Description'),
  language: string().required().oneOf(languages).label('Language'),
  level: string().required().oneOf(levels).label('Level'),
  price: number()
    .typeError('Price must be a number')
    .required()
    .min(1)
    .max(1000000)
    .test(
      'max-places',
      'Price cannot have more than 2 decimal places.',
      (val: number | undefined) => {
        if (!val) {
          return true;
        }
        if (isNaN(val)) {
          return true;
        }
        return val * 100 === Math.round(val * 100);
      }
    )
    .label('Price'),
  previewVideoURL: string()
    .required()
    .url()
    .min(4)
    .max(100)
    .label('Preview Video Url'),
  thumbnail: string()
    .required()
    .url()
    .min(4)
    .max(100)
    .label('Thumbnail Image Url')
});

export const outlineSchema = array()
  .required()
  .min(1)
  .max(1000)
  .label('Course Outline')
  .of(
    object().shape({
      uid: string(),
      value: string().required().min(4).max(500).label('Outline Item')
    })
  );

export const lessonSchema = array()
  .required()
  .min(1)
  .max(100)
  .label('Lessons')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      videoURL: string().required().url().min(4).max(100).label('Video Url'),
      duration: number()
        .required()
        .min(1)
        .max(1000)
        .label('Duration in Minutes')
        .integer()
    })
  );

export const answerSchema = array()
  .required()
  .min(4)
  .max(4)
  .test('unique-answers', 'Answers must be unique', a => {
    if (!a) {
      return true;
    }
    return a.length === new Set(a.map(i => i.value)).size;
  })
  .label('Options')
  .of(
    object().shape({
      uid: string(),
      value: string().required().min(4).max(500).label('Value')
    })
  );

export const questionSchema = array()
  .required()
  .min(1)
  .max(15)
  .label('Questions')
  .of(
    object().shape({
      uid: string(),
      question: string().required().min(10).max(500).label('Question'),
      options: answerSchema,
      answer: string()
        .required()
        .min(10)
        .max(500)
        .label('Answer')
        .when(
          'options',
          (options: AnswerFormValues[], schema: StringSchema) => {
            return schema.test(
              'valid-answer',
              'Correct answer must be one of the question choices.',
              a => {
                if (!a || !options) {
                  return true;
                }
                return !!options.find(o => o.value === a);
              }
            );
          }
        )
    })
  );

export const exerciseSchema = array()
  .required()
  .min(1)
  .max(50)
  .label('Exercises')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      questions: questionSchema
    })
  );

export const sectionSchema = array()
  .required()
  .min(1)
  .max(100)
  .label('Sections')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      description: string().required().min(4).max(1000).label('Description'),
      lessons: lessonSchema,
      exercises: exerciseSchema
    })
  );

export const courseSchema = object().shape({
  info: infoSchema,
  outline: outlineSchema,
  sections: sectionSchema
});
