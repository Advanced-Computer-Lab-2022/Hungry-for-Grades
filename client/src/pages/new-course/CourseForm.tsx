import { string, object, number } from 'yup';
import { Formik, Form } from 'formik';

import TextField from '@/components/form/TextField';
import {
  getTextFieldProps,
  stringArrayToOptions
} from '@/components/form/types';
import SelectField from '@/components/form/SelectField';
import { Level } from '@/services/axios/dataServices/CoursesDataService';

const languages = [
  'English',
  'German',
  'Arabic',
  'French',
  'Spanish',
  'Italian'
].sort();

const levels = Object.values(Level);

const courseSchema = object().shape({
  title: string().required().min(4).max(100).label('Title'),
  description: string().required().min(20).max(500).label('Description'),
  language: string().required().oneOf(languages).label('Language'),
  level: string().required().oneOf(levels).label('Level'),
  price: number()
    .typeError('Price must be a number')
    .required()
    .min(1)
    .max(1000000)
    .label('Price')
});

function submitCourse(values: object) {
  console.log(values);
}

function CourseForm() {
  return (
    <div className='container'>
      <h1 className='text-center text-dark mt-2'>Create Course</h1>
      <Formik
        initialValues={{
          title: '',
          description: '',
          language: '',
          level: '',
          price: null
        }}
        validationSchema={courseSchema}
        onSubmit={submitCourse}
      >
        {props => (
          <Form className='form-horizontal'>
            <TextField {...getTextFieldProps(props, courseSchema, 'title')} />
            <TextField
              {...getTextFieldProps(props, courseSchema, 'description')}
            />
            <div className='row'>
              <div className='col-12 col-md-4'>
                <SelectField
                  {...getTextFieldProps(props, courseSchema, 'language')}
                  options={stringArrayToOptions(languages)}
                />
              </div>
              <div className='col-12 col-md-4'>
                <SelectField
                  {...getTextFieldProps(props, courseSchema, 'level')}
                  options={stringArrayToOptions(levels)}
                />
              </div>
              <div className='col-12 col-md-4'>
                <TextField
                  {...getTextFieldProps(props, courseSchema, 'price')}
                />
              </div>

              <div className='form-group text-center m-3'>
                <button className='btn btn-primary' type='submit'>
                  Submit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CourseForm;
