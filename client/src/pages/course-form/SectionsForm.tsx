import { FieldArray, FormikProps, useFormikContext } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

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

          {formikProps.values.sections.map((section, index) => (
            <div
              key={section.uid}
              className='row rounded-1 border border-secondary my-2 py-2'
            >
              <h5 className='col-11 text-dark'>Section #{index + 1}</h5>
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
          ))}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() =>
                push({
                  uid: getUniqueId(),
                  title: '',
                  description: '',
                  lessons: [] as LessonFormValues[],
                  exercises: [] as ExerciseFormValues[]
                })
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
