import { useFormikContext } from 'formik';

import { CourseFormValues, languages, levels } from './course-form-types';

import { courseSchema } from './course-schemas';

import TextField from '@/components/form/TextField';
import {
  getTextFieldProps,
  stringArrayToOptions
} from '@/components/form/types';
import SelectField from '@/components/form/SelectField';

export function CourseInfoForm() {
  const formikProps = useFormikContext<CourseFormValues>();
  return (
    <>
      <TextField
        {...getTextFieldProps(formikProps, courseSchema, 'info.title')}
      />
      <TextField
        {...getTextFieldProps(formikProps, courseSchema, 'info.description')}
      />
      <div className='row'>
        <div className='col-12 col-md-4'>
          <SelectField
            {...getTextFieldProps(formikProps, courseSchema, 'info.language')}
            options={stringArrayToOptions(languages)}
          />
        </div>
        <div className='col-12 col-md-4'>
          <SelectField
            {...getTextFieldProps(formikProps, courseSchema, 'info.level')}
            options={stringArrayToOptions(levels)}
          />
        </div>
        <div className='col-12 col-md-4'>
          <TextField
            {...getTextFieldProps(formikProps, courseSchema, 'info.price')}
          />
        </div>
        <TextField
          {...getTextFieldProps(
            formikProps,
            courseSchema,
            'info.previewVideoURL'
          )}
        />
        <TextField
          {...getTextFieldProps(formikProps, courseSchema, 'info.thumbnail')}
        />
      </div>
    </>
  );
}
