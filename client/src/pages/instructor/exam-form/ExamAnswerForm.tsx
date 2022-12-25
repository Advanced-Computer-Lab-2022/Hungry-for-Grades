import { FieldArray, FormikProps, useFormikContext } from 'formik';
import { BsFillTrashFill } from 'react-icons/bs';

import { getUniqueId, QuestionFormValues } from '../course-form/course-form-types';

import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';
import TextField from '@/components/form/TextField';

export function ExamAnswerForm() {
  const formikProps = useFormikContext<QuestionFormValues>();
  const questionValues = formikProps.values;
  if (!questionValues) {
    return <></>;
  }
  return (
    <FieldArray name={`options`}>
      {({ remove, push }) => (
        <div className='my-2 px-5'>
          <h6 className='text-dark'>Options</h6>
          <ArrayErrorMessage {...formikProps} name={`options`} />
          {questionValues.options.map((option, index) => (
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
                  formik={formikProps as FormikProps<unknown>}
                  id={`options.${index}.value`}
                  label={`Value`}
                  name={`options.${index}.value`}
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

export default ExamAnswerForm;
