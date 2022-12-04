import { object, string, number, array, StringSchema, boolean } from 'yup';

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
    .matches(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      {
        message: 'URL must be a valid YouTube URL',
        excludeEmptyString: true
      }
    )
    .label('Preview Video Url'),
  thumbnail: string()
    .required()
    .url()
    .min(4)
    .max(160)
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

export const lessonsSchema = array()
  .required()
  .min(1)
  .max(100)
  .label('Lessons')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      videoURL: string()
        .required()
        .matches(
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
          {
            message: 'URL must be a valid YouTube URL',
            excludeEmptyString: true
          }
        )
        .label('Video Url'),
      duration: number()
        .required()
        .min(1)
        .max(1000)
        .label('Duration in Minutes')
        .integer()
    })
  );

export const answerOptionsSchema = array()
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
      value: string().required().min(1).max(500).label('Value')
    })
  );

export const questionSchema = object().shape({
  uid: string(),
  question: string().required().min(10).max(500).label('Question'),
  options: answerOptionsSchema,
  answer: string()
    .required()
    .min(1)
    .max(500)
    .label('Answer')
    .when('options', (options: AnswerFormValues[], schema: StringSchema) => {
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
    })
});

export const questionsSchema = array()
  .required()
  .min(1)
  .max(15)
  .label('Questions')
  .of(questionSchema);

export const exerciseSchema = array()
  .required()
  .min(1)
  .max(50)
  .label('Exercises')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      questions: questionsSchema
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
      lessons: lessonsSchema,
      exercises: exerciseSchema
    })
  );

export const courseSchema = object().shape({
  info: infoSchema,
  outline: outlineSchema,
  sections: sectionSchema,
  terms: boolean().test('ValidateRequired', 'You must accept the terms and conditions.', (v) => !!v),
});
