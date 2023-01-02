import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { OutlineFormValues, SectionFormValues } from './course-form-types';
import CourseForm from './CourseForm';

import { createCourse } from '@/services/axios/dataServices/CoursesDataService';
import { IAddCourseRequest } from '@/interfaces/course.interface';
import useInstructorId from '@/hooks/useInstuctorId';
import useRedirectToLogin from '@/hooks/useRedirectToLogin';
import { UseCountry } from '@/store/countryStore';

// TODO: later

function AddCourse() {
  const navigate = useNavigate();
  const redirectToLogin = useRedirectToLogin();
  const instructorId = useInstructorId();
  const country = UseCountry();

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
    sections: [] as SectionFormValues[],
    terms: false
  };

  const submitAction = useMemo(
    () => async (course: IAddCourseRequest) => {
      const result = await createCourse(course, country);
      if (result) {
        toast('Course was added successfully.');
        navigate(`/course/${result._id}`);
      }
    },
    [navigate, country]
  );
  if (!instructorId) {
    redirectToLogin();
    return <></>;
  }

  return (
    <CourseForm
      initialValues={initialValues}
      isUpdating={false}
      submitAction={submitAction}
    />
  );
}
export default AddCourse;
