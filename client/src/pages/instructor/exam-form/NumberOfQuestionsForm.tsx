import { Form, Formik, FormikProps } from 'formik';
import { useCallback, useContext } from 'react';

import { number, object } from 'yup';

import { ExamFormContext } from './exam-form-types';

import TextField from '@/components/form/TextField';

const numberOfQuestionsSchema = object().shape({
  numberOfQuestions: number()
    .min(1)
    .integer()
    .required()
    .label('Number of questions')
});

type NumberOfQuestionFormValues = {
  numberOfQuestions: string;
};
function NumberOfQuestionsForm(props: { numberOfQuestions: number }) {
  const examFormContext = useContext(ExamFormContext);
  const setNumberOfQuestions = useCallback(
    (values: NumberOfQuestionFormValues) =>
      examFormContext.setNumberOfQuestions(parseInt(values.numberOfQuestions)),
    [examFormContext]
  );
  return (
    <Formik
      initialValues={{
        numberOfQuestions:
          props.numberOfQuestions == 0 ? '' : props.numberOfQuestions.toString()
      }}
      validationSchema={numberOfQuestionsSchema}
      onSubmit={setNumberOfQuestions}
    >
      {formikProps => {
        return (
          <Form>
            <div>
              <TextField
                formik={formikProps as FormikProps<unknown>}
                id='numberOfQuestions'
                label='Number of questions'
                name='numberOfQuestions'
              />
              <div className='form-group text-end my-3'>
                <button className='btn btn-primary' type='submit'>
                  Next
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default NumberOfQuestionsForm;
