import { FieldArray, FormikProps } from 'formik';

import { CourseFormValues } from './course-form-types';

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
      {() => (
        <div className='my-2 px-5'>
          <h6 className='text-dark'>Options</h6>
          <ArrayErrorMessage
            {...props}
            name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options`}
          />
          {props.values.sections[props.sectionIndex]?.exercises[
            props.exerciseIndex
          ]?.questions[props.questionIndex]?.options.map((option, index) => (
            <div key={option.uid} className='col-12'>
              <TextField
                formik={props as FormikProps<unknown>}
                id={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options.${index}.value`}
                label={`Option #${index + 1}`}
                name={`sections.${props.sectionIndex}.exercises.${props.exerciseIndex}.questions.${props.questionIndex}.options.${index}.value`}
              />
            </div>
          ))}
        </div>
      )}
    </FieldArray>
  );
}
