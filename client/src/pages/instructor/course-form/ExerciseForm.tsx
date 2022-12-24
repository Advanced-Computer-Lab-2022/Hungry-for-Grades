import { FieldArray, FormikProps } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';

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
          <Accordion allowZeroExpanded>
            {props.values.sections[props.sectionIndex]?.exercises.map(
              (exercise, index) => (
                <AccordionItem key={`acc${exercise.uid}`}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <strong>Exercise #{index + 1}</strong>
                      <div className='float-end' style={{ marginTop: '-10px' }}>
                        <button
                          className='btn btn-danger'
                          type='button'
                          onClick={() => remove(index)}
                        >
                          <BsFillTrashFill />
                        </button>
                      </div>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <div className='row my-2 py-2'>
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
                  </AccordionItemPanel>
                </AccordionItem>
              )
            )}
          </Accordion>
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
