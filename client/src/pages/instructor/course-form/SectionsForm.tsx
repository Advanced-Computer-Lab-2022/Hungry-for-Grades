import { FieldArray, FormikProps, useFormikContext } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';

import {
  CourseFormValues,
  LessonFormValues,
  ExerciseFormValues,
  getUniqueId
} from './course-form-types';

import { LessonsForm } from './LessonsForm';

import { ExerciseForm } from './ExerciseForm';

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function SectionsForm() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <FieldArray name='sections'>
      {({ remove, push }) => (
        <div className='my-2'>
          <ArrayErrorMessage {...formikProps} name='sections' />
          <Accordion allowZeroExpanded>
            {formikProps.values.sections.map((section, index) => (
              <AccordionItem key={`${section.uid}`} uuid={section.uid}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <strong>Section #{index + 1}</strong>
                    <div className='float-end' style={{marginTop: '-10px'}}>
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
                  <div className='row'>
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
                    <ExerciseForm {...formikProps} sectionIndex={index} />
                  </div>
                </AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() => {
                const uid = getUniqueId();
                push({
                  uid,
                  title: '',
                  description: '',
                  lessons: [] as LessonFormValues[],
                  exercises: [] as ExerciseFormValues[]
                });
              }
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
