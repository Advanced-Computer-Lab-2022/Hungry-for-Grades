import { FieldArray, FormikProps } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import { CourseFormValues, getUniqueId } from './course-form-types';

import { QuestionForm } from './QuestionForm';

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function ExerciseForm(
  props: FormikProps<CourseFormValues> & { sectionIndex: number }
) {
  return (
    <FieldArray name={`sections.${props.sectionIndex}.exercises`}>
      {({ remove, push }) => (
        <div className='my-2 px-5'>
          <h5 className='text-dark'>Exercises</h5>
          <ArrayErrorMessage
            {...props}
            name={`sections.${props.sectionIndex}.exercises`}
          />
          {props.values.sections[props.sectionIndex]?.exercises.map(
            (exercise, index) => (
              <div
                key={exercise.uid}
                className='row rounded-1 border border-secondary my-2 py-2'
              >
                <h6 className='col-11 text-dark'>Exercise #{index + 1}</h6>
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
                    id={`sections.${props.sectionIndex}.exercises.${index}.title`}
                    label={`Title`}
                    name={`sections.${props.sectionIndex}.exercises.${index}.title`}
                  />
                </div>
                <QuestionForm
                  {...props}
                  exerciseIndex={index}
                  sectionIndex={props.sectionIndex}
                />
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
                  questions: []
                })
              }
            >
              Add new exercise
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
