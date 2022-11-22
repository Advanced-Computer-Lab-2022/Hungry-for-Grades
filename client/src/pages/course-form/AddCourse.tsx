import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { OutlineFormValues, SectionFormValues } from './course-form-types';
import CourseForm from './CourseForm';

import { createCourse } from '@/services/axios/dataServices/CoursesDataService';
import { IAddCourseRequest } from '@/interfaces/course.interface';

// TODO: later

function AddCourse() {
  const navigate = useNavigate();

  const initialValues = {
    info: {
      title: '',
      description: '',
      language: '',
      level: '',
      price: '',
      thumbnail: '',
      previewVideoURL: ''
    },
    outline: [] as OutlineFormValues[],
    sections: [] as SectionFormValues[]
  };

  const submitAction = useMemo(
    () => async (course: IAddCourseRequest) => {
      const result = await createCourse(course);
      if (result) {
        toast('Course was added successfully.');
        navigate(`/course/${result._id}`);
      }
    },
    [navigate]
  );
  return (
    <CourseForm
      initialValues={initialValues}
      isUpdating={false}
      submitAction={submitAction}
    />
  );
}
export default AddCourse;
