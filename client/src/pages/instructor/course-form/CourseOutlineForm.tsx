import { FieldArray, FormikProps, useFormikContext } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import { CourseFormValues, getUniqueId } from './course-form-types';

import TextField from '@/components/form/TextField';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

export function CourseOutlineForm() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <FieldArray name='outline'>
      {({ remove, push }) => (
        <div className='my-2'>
          <ArrayErrorMessage {...formikProps} name='outline' />
          {formikProps.values.outline.map((item, index) => (
            <div key={item.uid} className='row'>
              <div className='col-11'>
                <TextField
                  formik={formikProps as FormikProps<unknown>}
                  id={`outline.${index}.value`}
                  label={`Item #${index + 1}`}
                  name={`outline.${index}.value`}
                />
              </div>
              <div className='col-1 pt-4 px-0'>
                <button
                  className='btn btn-danger mt-2'
                  type='button'
                  onClick={() => remove(index)}
                >
                  <BsFillTrashFill />
                </button>
              </div>
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-secondary btn-sm'
              type='button'
              onClick={() => push({ uid: getUniqueId(), value: '' })}
            >
              Add new outline
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}
