import { object } from 'yup';
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import Modal from 'react-modal';

import { BsFillXCircleFill } from 'react-icons/bs';

import { useCallback, useState } from 'react';

import {
  CourseFormProps,
  CourseFormValues,
  CourseSubmitAction
} from './course-form-types';

import {
  courseSchema,
  infoSchema,
  outlineSchema,
  sectionSchema
} from './course-schemas';

import { CourseInfoForm } from './CourseInfoForm';

import { CourseOutlineForm } from './CourseOutlineForm';

import { SectionsForm } from './SectionsForm';

import styles from './course-form.module.scss';

import { Level } from '@/enums/level.enum';
import {
  CourseDiscount,
  IAddCourseRequest
} from '@/interfaces/course.interface';
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
  //const id = UseParams();
  //alert(id);
  //console.log(id);
  //return id;
  return '6379620f2c3f71696ca34735';
}

async function submitCourse(
  values: CourseFormValues,
  submitAction: CourseSubmitAction
) {
  const course: IAddCourseRequest = {
    ...values.info,
    instructorID: getCurrentUserID(),
    level: values.info.level as Level,
    category: 'Web Development',
    captions: [] as string[],
    subcategory: [] as string[],
    outline: values.outline.map(o => o.value),
    sections: values.sections.map(s => ({
      _id: s._id,
      title: s.title,
      description: s.description,
      exercises: s.exercises.map(e => ({
        _id: e._id,
        title: e.title,
        numberOfQuestions: e.questions.length,
        questions: e.questions.map(q => ({
          _id: q._id,
          question: q.question,
          options: q.options.map(o => o.value),
          answer: q.answer
        }))
      })),
      lessons: s.lessons.map(l => ({
        _id: l._id,
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
  };

  await submitAction(course);
}

function CourseForm(props: CourseFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const openTerms = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closeTerms = useCallback(() => setModalOpen(false), [setModalOpen]);
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
      await submitCourse(values, props.submitAction);
    } else {
      actions.setTouched({});
      actions.setSubmitting(false);
      next();
    }
  };
  return (
    <div className='container'>
      <h1 className='text-center text-dark mt-2'>
        {props.isUpdating ? 'Edit' : 'Create'} Course
      </h1>
      <Formik
        initialValues={props.initialValues}
        // eslint-disable-next-line security/detect-object-injection
        validationSchema={isLastStep ? courseSchema : schemas[currentStepIndex]}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
      >
        {formikProps => {
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
                  {isLastStep && (
                    <>
                      <div className='d-flex flex-raw'>
                        <div className='form-check'>
                          <Field
                            className='form-check-input'
                            id='terms'
                            name='terms'
                            type='checkbox'
                          />
                          <label
                            className='form-check-label'
                            htmlFor='invalidCheck'
                          >
                            I read and agree to the{' '}
                            <button
                              className={`btn btn-link d-inline p-0 m-0 border-0 ${
                                styles['terms-link'] ?? ''
                              }`}
                              type='button'
                              onClick={openTerms}
                            >
                              Terms and Conditions
                            </button>
                          </label>
                        </div>
                      </div>
                      <div className='text-start'>
                        <ErrorMessage
                          className={styles['terms-error']}
                          component='div'
                          name='terms'
                        />
                      </div>
                    </>
                  )}
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
                    <>
                      <button
                        className='btn btn-primary'
                        disabled={formikProps.isSubmitting}
                        type='submit'
                      >
                        Submit
                      </button>
                    </>
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
      <Modal className={styles['modal-container'] ?? ''} isOpen={modalOpen}>
        <div className={styles['close-button-container'] ?? ''}>
          <button
            className={styles['close-button']}
            type='button'
            onClick={closeTerms}
          >
            <BsFillXCircleFill />
          </button>
        </div>
        <div className={`container ${styles['scroll-container'] ?? ''}`}>
          <h1>Terms and Conditions</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default CourseForm;
