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

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function LessonsForm(
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
          <Accordion allowZeroExpanded>
            {props.values.sections[props.sectionIndex]?.lessons.map(
              (lesson, index) => (
                <AccordionItem key={`acc${lesson.uid}`}>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      <strong>Lesson #{index + 1}</strong>
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
