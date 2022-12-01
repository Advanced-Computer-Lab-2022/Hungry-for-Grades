import { Form, Formik, FormikProps } from 'formik';
import { useCallback, useContext } from 'react';

import { QuestionFormValues } from './course-form-types';
import { questionSchema } from './course-schemas';
import { ExamFormContext } from './exam-form-types';

import { ExamAnswerForm } from './ExamAnswerForm';

import TextField from '@/components/form/TextField';

function ExamQuestionForm(props: {
  questionIndex: number;
  question: QuestionFormValues;
  isLastQuestion: boolean;
}) {
  const examFormContext = useContext(ExamFormContext);
  const setQuestion = useCallback(
    (values: QuestionFormValues) => {
      examFormContext.setQuestion(values, props.questionIndex);
    },
    [examFormContext, props.questionIndex]
  );
  return (
    <Formik
      initialValues={props.question}
      validationSchema={questionSchema}
      onSubmit={setQuestion}
    >
      {formikProps => (
        <Form>
          <div className='row my-2 py-2'>
            <div className='col-1 px-0 text-end pe-2' />
            <div className='col-12'>
              <TextField
                formik={formikProps as FormikProps<unknown>}
                id={`question`}
                label={`Question`}
                name={`question`}
              />
            </div>
            <div className='col-12'>
              <TextField
                formik={formikProps as FormikProps<unknown>}
                id={`answer`}
                label={`Answer`}
                name={`answer`}
              />
            </div>
            <ExamAnswerForm />
          </div>
          <div className='form-group text-end my-3'>
            <button
              className='btn btn-secondary mx-2'
              type='button'
              onClick={examFormContext.prev}
            >
              Prev
            </button>
            <button className='btn btn-primary' type='submit'>
              {props.isLastQuestion ? 'Submit' : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ExamQuestionForm;
