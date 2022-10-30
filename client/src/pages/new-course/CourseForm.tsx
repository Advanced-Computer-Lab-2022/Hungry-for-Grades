import { string, object, number, array } from 'yup';
import { Formik, Form, FieldArray, FormikProps } from 'formik';

import TextField from '@/components/form/TextField';
import {
  getTextFieldProps,
  stringArrayToOptions
} from '@/components/form/types';
import SelectField from '@/components/form/SelectField';
import { Level } from '@/enums/level.enum';
import ArrayErrorMessage from '@/components/form/ArrayErrorMessage';

type Lesson = {
  duration: string;
  title: string;
  videoURL: string;
};

type SectionFormValues = {
  title: string;
  description: string;
  lessons: Lesson[];
};

type CourseFormValues = {
  title: string;
  description: string;
  language: string;
  level: string;
  price: string;
  outline: string[];
  sections: SectionFormValues[];
};

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
    .test(
      'max-places',
      'Price cannot have more than 2 decimal places.',
      (val: number | undefined) => {
        if (!val) {
          return true;
        }
        if (isNaN(val)) {
          return true;
        }
        return val * 100 === Math.round(val * 100);
      }
    )
    .label('Price'),
  outline: array()
    .required()
    .min(1)
    .max(1000)
    .label('Course Outline')
    .of(string().required().min(4).max(500).label('Outline Item')),
  sections: array()
    .required()
    .min(1)
    .max(1000)
    .label('Sections')
    .of(
      object().shape({
        title: string().required().min(4).max(100).label('Title'),
        description: string().required().min(4).max(1000).label('Description'),
        lessons: array()
          .required()
          .min(1)
          .max(100)
          .label('Lessons')
          .of(
            object().shape({
              title: string().required().min(4).max(100).label('Title'),
              videoURL: string()
                .required()
                .url()
                .min(4)
                .max(100)
                .label('Video Url'),
              duration: number()
                .required()
                .min(1)
                .max(1000)
                .label('Duration in Minutes')
                .integer()
            })
          )
      })
    )
});

function submitCourse(values: CourseFormValues) {
  console.log(values);
}

function CourseOutlineForm(props: FormikProps<CourseFormValues>) {
  return (
    <FieldArray name='outline'>
      {({ remove, push }) => (
        <div className='my-2'>
          <h3 className='text-dark'>Outline</h3>
          <ArrayErrorMessage {...props} name='outline' />
          {props.values.outline.map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className='row'>
              <div className='col-11'>
                <TextField
                  formik={props as FormikProps<unknown>}
                  id={`outline.${index}`}
                  label={`Item #${index + 1}`}
                  name={`outline.${index}`}
                />
              </div>
              <div className='col-1 pt-4 px-0'>
                <button
                  className='btn btn-danger btn-sm my-2'
                  type='button'
                  onClick={() => remove(index)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-success btn-sm'
              type='button'
              onClick={() => push('')}
            >
              Add new outline
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
}

function LessonsForm(
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
          {props.values.sections[props.sectionIndex]?.lessons.map(
            (_, index) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className='row rounded-1 border border-secondary my-2 py-2'
              >
                <h6 className='col-11 text-dark'>Lesson #{index + 1}</h6>
                <div className='col-1 px-0 text-end pe-2'>
                  <button
                    className='btn btn-danger btn-sm'
                    type='button'
                    onClick={() => remove(index)}
                  >
                    X
                  </button>
                </div>
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
                    id={`sections.${props.sectionIndex}.lessons.${index}.videoURL`}
                    label={`Video URL`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.videoURL`}
                  />
                </div>
                <div className='col-12'>
                  <TextField
                    formik={props as FormikProps<unknown>}
                    id={`sections.${props.sectionIndex}.lessons.${index}.duration`}
                    label={`Duration in minutes`}
                    name={`sections.${props.sectionIndex}.lessons.${index}.duration`}
                  />
                </div>
              </div>
            )
          )}
          <div className='my-1'>
            <button
              className='btn btn-success btn-sm'
              type='button'
              onClick={() =>
                push({
                  title: '',
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

function SectionsForm(props: FormikProps<CourseFormValues>) {
  return (
    <FieldArray name='sections'>
      {({ remove, push }) => (
        <div className='my-2'>
          <h3 className='text-dark'>Sections</h3>
          <ArrayErrorMessage {...props} name='sections' />

          {props.values.sections.map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className='row rounded-1 border border-secondary my-2 py-2'
            >
              <h5 className='col-11 text-dark'>Section #{index + 1}</h5>
              <div className='col-1 px-0 text-end pe-2'>
                <button
                  className='btn btn-danger btn-sm'
                  type='button'
                  onClick={() => remove(index)}
                >
                  X
                </button>
              </div>
              <div className='col-12'>
                <TextField
                  formik={props as FormikProps<unknown>}
                  id={`sections.${index}.title`}
                  label={`Title`}
                  name={`sections.${index}.title`}
                />
              </div>
              <div className='col-12'>
                <TextField
                  formik={props as FormikProps<unknown>}
                  id={`sections.${index}.description`}
                  label={`Description`}
                  name={`sections.${index}.description`}
                />
              </div>
              <LessonsForm {...props} sectionIndex={index} />
            </div>
          ))}
          <div className='my-1'>
            <button
              className='btn btn-success btn-sm'
              type='button'
              onClick={() =>
                push({
                  title: '',
                  description: '',
                  lessons: [] as Lesson[]
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
          price: '',
          outline: [] as string[],
          sections: [] as SectionFormValues[]
        }}
        validationSchema={courseSchema}
        onSubmit={submitCourse}
      >
        {props => (
          <Form className='form-horizontal small'>
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
              <CourseOutlineForm {...props} />
              <SectionsForm {...props} />
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
