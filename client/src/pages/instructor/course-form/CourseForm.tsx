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
import ProgressStepper from '@/components/progress/progressStepper/ProgressStepper';
import useMultistepForm from '@/hooks/useMultistepForm';
import useInstructorId from '@/hooks/useInstuctorId';

// import CheckBoxInput from '@/components/inputs/checkbox/CheckBoxInput';

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

async function submitCourse(
  values: CourseFormValues,
  submitAction: CourseSubmitAction
) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const instructorId = useInstructorId();
  if (!instructorId) {
    return;
  }
  const course: IAddCourseRequest = {
    ...values.info,
    instructorID: instructorId,
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
    goTo,
    next,
    prev
  } = useMultistepForm(
    [
      <CourseInfoForm key='CourseInfo' />,
      <CourseOutlineForm key='CourseOutlineForm' />,
      <SectionsForm key='SectionsForm' />
    ].slice(0, props.isUpdating ? 1 : 3),
    stepTitles.slice(0, props.isUpdating ? 1 : 3),
    stepDescriptions.slice(0, props.isUpdating ? 1 : 3)
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
              <ProgressStepper
                currentStepIndex={currentStepIndex}
                goTo={goTo}
                steps={stepTitles}
                subtitles={stepDescriptions}
              />
              <div className='border border-primary p-3 rounded mb-3'>
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
                        {!props.isUpdating && (
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
                        )}
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
          <h3>Terms and Conditions</h3>
          <p>
            Please read the following terms and conditions carefully before
            proceeding.
          </p>

          <h4>Refund Policy</h4>
          <ul>
            <li style={{ listStyle: 'initial' }}>
              A Trainee may request a refund as long as they did not access more
              then 50% of the course content.
            </li>
            <li style={{ listStyle: 'initial' }}>
              In case the trainee did not access any of the course content, they
              are eligible for a full refund.
            </li>
            <li style={{ listStyle: 'initial' }}>
              In case of a refund, the trainee gets 70% of the course cost value
              back content they access is less than 50% of the course content.
            </li>
            <li style={{ listStyle: 'initial' }}>
              In case the trainee access more than 50% of the course content,
              they are not eligible for refund.
            </li>
          </ul>

          <h4>Revenue sharing</h4>
          <ul>
            <li style={{ listStyle: 'initial' }}>
              80% of the course cost paid by the trainees is shared by the
              instructor(s). The remaining 20% goes to Canadian Chamber of
              Commerce.
            </li>

            <li style={{ listStyle: 'initial' }}>
              The refunded value is deducted from the instructors&apos; revenue
              according to the aforementioned 80%/20% ratio.
            </li>
            <li style={{ listStyle: 'initial' }}>
              Discounts, offered by The Canadian Chamber of Commerce, from the
              instructors&apos; revenue according to the aforementioned 80%/20%
              ratio.
            </li>
          </ul>

          <h4>Content Resposibility</h4>
          <p>
            The content of the courses you create are your responsibility. The
            Canadian Chamber of Commerce reserves the right to delete any
            inappropriate content that violates our code of content or the law.
          </p>

          <h4>Deleting the course</h4>
          <p>
            The instructors can request that their course be deleted. Any
            trainees who purchased the course, will receive a full refund and
            this is deducted from instructors&apos; revenue.
          </p>
        </div>
      </Modal>
    </div>
  );
}

// function UseParams() {
//   throw new Error('Function not implemented.');
// }
export default CourseForm;
