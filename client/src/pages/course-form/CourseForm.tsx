import { object } from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';

import { toast } from 'react-toastify';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import {
  CourseFormValues,
  OutlineFormValues,
  SectionFormValues
} from './course-form-types';

import { infoSchema, outlineSchema, sectionSchema } from './course-schemas';

import { CourseInfoForm } from './CourseInfoForm';

import { CourseOutlineForm } from './CourseOutlineForm';

import { SectionsForm } from './SectionsForm';

import { Level } from '@/enums/level.enum';
import { createCourse } from '@/services/axios/dataServices/CoursesDataService';
import { CourseDiscount } from '@/interfaces/course.interface';
import ProgressSteps from '@/components/progress/ProgressSteps';
import useMultistepForm from '@/hooks/useMultistepForm';

const stepTitles = ['Course Info', 'Course Outline', 'Course Sections'];

const stepDescriptions = [
  'Information about your course',
  'Topics covered in your course',
  'Chapters and lessons in your course'
];

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
      <CourseInfoForm key='CourseInfo' />,
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
