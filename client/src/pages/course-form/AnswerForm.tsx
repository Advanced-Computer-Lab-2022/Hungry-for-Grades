import { FieldArray, FormikProps } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import { CourseFormValues, getUniqueId } from './course-form-types';

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function AnswerForm(
  props: FormikProps<CourseFormValues> & {
    sectionIndex: number;
    exerciseIndex: number;
    questionIndex: number;
  }
) {
  return (
    <FieldArray
      name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options`}
    >
      {({ remove, push }) => (
        <div className='my-2 px-5'>
          <h6 className='text-dark'>Options</h6>
          <ArrayErrorMessage
            {...props}
            name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options`}
          />
          {props.values.sections[props.sectionIndex]?.exercises[
            props.exerciseIndex
          ]?.questions[props.questionIndex]?.options.map((option, index) => (
            <div
              key={option.uid}
              className='row rounded-1 border border-secondary my-2 py-2'
            >
              <h6 className='col-11 text-dark'>Option #{index + 1}</h6>
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
                  id={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options.${index}.value`}
                  label={`Value`}
                  name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options.${index}.value`}
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
                  value: ''
                })
              }
            >
              Add new option
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
