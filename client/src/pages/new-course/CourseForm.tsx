import { string, object, number, array } from 'yup';
import {
  Formik,
  Form,
  FieldArray,
  FormikProps,
  useFormikContext,
  FormikHelpers
} from 'formik';

import { toast } from 'react-toastify';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';

import TextField from '@/components/form/TextField';
import {
  getTextFieldProps,
  stringArrayToOptions
} from '@/components/form/types';
import SelectField from '@/components/form/SelectField';
import { Level } from '@/enums/level.enum';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';
import { createCourse } from '@/services/axios/dataServices/CoursesDataService';
import { CourseDiscount } from '@/interfaces/course.interface';
import ProgressSteps from '@/components/progress/ProgressSteps';
import useMultistepForm from '@/hooks/useMultistepForm';

let nextId = 1;
function getUniqueId() {
  return `id-${nextId++}`;
}

const stepTitles = ['Course Info', 'Course Outline', 'Course Sections'];

const stepDescriptions = [
  'Information about your course',
  'Topics covered in your course',
  'Chapters and lessons in your course'
];

type LessonFormValues = {
  uid: string;
  description: string;
  duration: string;
  title: string;
  videoURL: string;
};

type AnswerFormValues = {
  uid: string;
  value: string;
};

type ExerciseFormValues = {
  title: string;
  questions: {
    answer: string;
    options: AnswerFormValues[];
    question: string;
  }[];
};

type SectionFormValues = {
  uid: string;
  description: string;
  lessons: LessonFormValues[];
  exercises: ExerciseFormValues[];
  title: string;
};

type OutlineFormValues = {
  uid: string;
  value: string;
};

type CourseInfoFormValues = {
  title: string;
  description: string;
  language: string;
  level: string;
  price: string;
  previewVideoURL: string;
  thumbnail: string;
};

type CourseFormValues = {
  info: CourseInfoFormValues;
  outline: OutlineFormValues[];
  sections: SectionFormValues[];
};

const languages = [
  'English',
  'German',
  'Arabic',
  'French',
  'Spanish',
  'Italian'
].sort();

const levels = Object.values(Level);

const infoSchema = object().shape({
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

const outlineSchema = array()
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

const sectionSchema = array()
  .required()
  .min(1)
  .max(1000)
  .label('Sections')
  .of(
    object().shape({
      uid: string(),
      title: string().required().min(4).max(100).label('Title'),
      description: string().required().min(4).max(1000).label('Description'),
      lessons: array()
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
              .url()
              .min(4)
              .max(100)
              .label('Video Url'),
            duration: number()
              .required()
              .min(1)
              .max(1000)
              .label('Duration in Minutes')
              .integer()
          })
        )
    })
  );

const courseSchema = object().shape({
  info: infoSchema,
  outline: outlineSchema,
  sections: sectionSchema
});

const schemas = [
  object().shape({
    info: infoSchema
  }),
  object().shape({
    outline: outlineSchema
  }),
  object().shape({
    sections: sectionSchema
  })
];

// TODO: later
function getCurrentUserID() {
  return '6379620f2c3f71696ca34735';
}

async function submitCourse(
  values: CourseFormValues,
  navigate: NavigateFunction
) {
  const result = await createCourse({
    ...values.info,
    instructorID: getCurrentUserID(),
    level: values.info.level as Level,
    category: 'Web Development',
    captions: [] as string[],
    subcategory: [] as string[],
    outline: values.outline.map(o => o.value),
    sections: values.sections.map(s => ({
      title: s.title,
      description: s.description,
      exercises: s.exercises.map(e => ({
        title: e.title,
        numberOfQuestions: e.questions.length,
        questions: e.questions.map(q => ({
          question: q.question,
          options: q.options.map(o => o.value),
          answer: q.answer
        }))
      })),
      lessons: s.lessons.map(l => ({
        duration: parseInt(l.duration, 10),
        videoURL: l.videoURL,
        title: l.title,
        description: l.description
      }))
    })),
    price: {
      currentValue: parseFloat(values.info.price),
      currency: 'CAD',
      discounts: [] as CourseDiscount[]
    },
    keywords: [] as string[],
    duration: values.sections.reduce(
      (sum, sec) =>
        sum +
        sec.lessons.reduce(
          (sum2, les) => sum2 + parseInt(les.duration as unknown as string, 10),
          0
        ),
      0
    )
  });
  if (result) {
    toast('Course was added successfully.');
    navigate(`/course/${result._id}`);
  }
}

function CourseOutlineForm() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <FieldArray name='outline'>
      {({ remove, push }) => (
        <div className='my-2'>
          <ArrayErrorMessage {...formikProps} name='outline' />
          {formikProps.values.outline.map((item, index) => (
            <div key={item.uid} className='row'>
              <div className='col-11'>
                <TextField
                  formik={formikProps as FormikProps<unknown>}
                  id={`outline.${index}.value`}
                  label={`Item #${index + 1}`}
                  name={`outline.${index}.value`}
                />
              </div>
              <div className='col-1 pt-4 px-0'>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => remove(index)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() => push({ uid: getUniqueId(), value: '' })}
            >
              Add new outline
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}

function LessonsForm(
  props: FormikProps<CourseFormValues> & { sectionIndex: number }
) {
  return (
    <FieldArray name={`sections.${props.sectionIndex}.lessons`}>
      {({ remove, push }) => (
        <div className='my-2 px-5'>
          <h5 className='text-dark'>Lessons</h5>
          <ArrayErrorMessage
            {...props}
            name={`sections.${props.sectionIndex}.lessons`}
          />
          {props.values.sections[props.sectionIndex]?.lessons.map(
            (lesson, index) => (
              <div
                key={lesson.uid}
                className='row rounded-1 border border-secondary my-2 py-2'
              >
                <h6 className='col-11 text-dark'>Lesson #{index + 1}</h6>
                <div className='col-1 px-0 text-end pe-2'>
                  <button
                    className='btn btn-danger'
                    type='button'
                    onClick={() => remove(index)}
                  >
                    <BsFillTrashFill />
                  </button>
                </div>
                <div className='col-12'>
                  <TextField
                    formik={props as FormikProps<unknown>}
                    id={`sections.${props.sectionIndex}.lessons.${index}.title`}
                    label={`Title`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.title`}
                  />
                </div>
                <div className='col-12'>
                  <TextField
                    formik={props as FormikProps<unknown>}
                    id={`sections.${props.sectionIndex}.lessons.${index}.description`}
                    label={`Description`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.description`}
                  />
                </div>
                <div className='col-12'>
                  <TextField
                    formik={props as FormikProps<unknown>}
                    id={`sections.${props.sectionIndex}.lessons.${index}.videoURL`}
                    label={`Video URL`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.videoURL`}
                  />
                </div>
                <div className='col-12'>
                  <TextField
                    formik={props as FormikProps<unknown>}
                    id={`sections.${props.sectionIndex}.lessons.${index}.duration`}
                    label={`Duration in minutes`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.duration`}
                  />
                </div>
              </div>
            )
          )}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() =>
                push({
                  uid: getUniqueId(),
                  title: '',
                  description: '',
                  videoURL: '',
                  duration: ''
                })
              }
            >
              Add new lesson
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}

function SectionsForm() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <FieldArray name='sections'>
      {({ remove, push }) => (
        <div className='my-2'>
          <ArrayErrorMessage {...formikProps} name='sections' />

          {formikProps.values.sections.map((section, index) => (
            <div
              key={section.uid}
              className='row rounded-1 border border-secondary my-2 py-2'
            >
              <h5 className='col-11 text-dark'>Section #{index + 1}</h5>
              <div className='col-1 px-0 text-end pe-2'>
                <button
                  className='btn btn-danger'
                  type='button'
                  onClick={() => remove(index)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
              <div className='col-12'>
                <TextField
                  formik={formikProps as FormikProps<unknown>}
                  id={`sections.${index}.title`}
                  label={`Title`}
                  name={`sections.${index}.title`}
                />
              </div>
              <div className='col-12'>
                <TextField
                  formik={formikProps as FormikProps<unknown>}
                  id={`sections.${index}.description`}
                  label={`Description`}
                  name={`sections.${index}.description`}
                />
              </div>
              <LessonsForm {...formikProps} sectionIndex={index} />
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() =>
                push({
                  uid: getUniqueId(),
                  title: '',
                  description: '',
                  lessons: [] as LessonFormValues[],
                  exercises: [] as ExerciseFormValues[]
                })
              }
            >
              Add new section
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}

function CourseInfo() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <>
      <TextField
        {...getTextFieldProps(formikProps, courseSchema, 'info.title')}
      />
      <TextField
        {...getTextFieldProps(formikProps, courseSchema, 'info.description')}
      />
      <div className='row'>
        <div className='col-12 col-md-4'>
          <SelectField
            {...getTextFieldProps(formikProps, courseSchema, 'info.language')}
            options={stringArrayToOptions(languages)}
          />
        </div>
        <div className='col-12 col-md-4'>
          <SelectField
            {...getTextFieldProps(formikProps, courseSchema, 'info.level')}
            options={stringArrayToOptions(levels)}
          />
        </div>
        <div className='col-12 col-md-4'>
          <TextField
            {...getTextFieldProps(formikProps, courseSchema, 'info.price')}
          />
        </div>
        <TextField
          {...getTextFieldProps(
            formikProps,
            courseSchema,
            'info.previewVideoURL'
          )}
        />
        <TextField
          {...getTextFieldProps(formikProps, courseSchema, 'info.thumbnail')}
        />
      </div>
    </>
  );
}

function CourseForm() {
  const navigate = useNavigate();
  const {
    currentStepIndex,
    steps,
    step,
    title,
    subtitle,
    isLastStep,
    next,
    prev
  } = useMultistepForm(
    [
      <CourseInfo key='CourseInfo' />,
      <CourseOutlineForm key='CourseOutlineForm' />,
      <SectionsForm key='SectionsForm' />
    ],
    stepTitles,
    stepDescriptions
  );
  const handleSubmit = async (
    values: CourseFormValues,
    actions: FormikHelpers<CourseFormValues>
  ) => {
    if (isLastStep) {
      await submitCourse(values, navigate);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
      next();
    }
  };
  return (
    <div className='container'>
      <h1 className='text-center text-dark mt-2'>Create Course</h1>
      <Formik
        initialValues={{
          info: {
            title: '',
            description: '',
            language: '',
            level: '',
            price: '',
            thumbnail: '',
            previewVideoURL: ''
          },
          outline: [] as OutlineFormValues[],
          sections: [] as SectionFormValues[]
        }}
        // eslint-disable-next-line security/detect-object-injection
        validationSchema={schemas[currentStepIndex]}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <Form className='form-horizontal small'>
              <ProgressSteps
                currentStepIndex={currentStepIndex}
                steps={stepTitles}
              />
              <div className='border border-primary p-3 rounded'>
                <div className='float-end'>
                  <strong className='text-dark'>
                    {currentStepIndex + 1}/{steps.length}
                  </strong>
                </div>
                <h3 className='text-dark'>{title}</h3>
                <h5 className='text-dark'>{subtitle}</h5>
                {step}
                <div className='form-group text-end my-3'>
                  {currentStepIndex > 0 && (
                    <button
                      className='btn btn-secondary mx-2'
                      type='button'
                      onClick={prev}
                    >
                      Prev
                    </button>
                  )}
                  {isLastStep && (
                    <button
                      className='btn btn-primary'
                      disabled={props.isSubmitting}
                      type='submit'
                    >
                      Submit
                    </button>
                  )}
                  {!isLastStep && (
                    <button className='btn btn-primary' type='submit'>
                      Next
                    </button>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default CourseForm;
