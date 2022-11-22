import { FieldArray, FormikProps } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import { CourseFormValues, getUniqueId } from './course-form-types';

import { AnswerForm } from './AnswerForm';

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function QuestionForm(
  props: FormikProps<CourseFormValues> & {
    sectionIndex: number;
    exerciseIndex: number;
  }
) {
  return (
    <FieldArray
      name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions`}
    >
      {({ remove, push }) => (
        <div className='my-2 px-5'>
          <h6 className='text-dark'>Questions</h6>
          <ArrayErrorMessage
            {...props}
            name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions`}
          />
          {props.values.sections[props.sectionIndex]?.exercises[
            props.exerciseIndex
          ]?.questions.map((question, index) => (
            <div
              key={question.uid}
              className='row rounded-1 border border-secondary my-2 py-2'
            >
              <h6 className='col-11 text-dark'>Question #{index + 1}</h6>
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
                  id={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${index}.question`}
                  label={`Question`}
                  name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${index}.question`}
                />
              </div>
              <AnswerForm
                {...props}
                exerciseIndex={props.exerciseIndex}
                questionIndex={index}
                sectionIndex={props.sectionIndex}
              />
              <div className='col-12'>
                <TextField
                  formik={props as FormikProps<unknown>}
                  id={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${index}.answer`}
                  label={`Answer`}
                  name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${index}.answer`}
                />
              </div>
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() =>
                push({
                  uid: getUniqueId(),
                  question: '',
                  options: [],
                  answer: ''
                })
              }
            >
              Add new question
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
