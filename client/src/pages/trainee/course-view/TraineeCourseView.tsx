import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import Content from './Content';

import Video from './Video';

import SolveExercise from './SolveExercise';

import DownView from './DownView';

import { UseCountry } from '@/store/countryStore';
import { ICourse } from '@/interfaces/course.interface';
import { useTraineeId } from '@/hooks/useTraineeId';
import { getEnrolledCourseById } from '@/services/axios/dataServices/TraineeDataService';
import Loader from '@/components/loader/loaderpage/Loader';
import useRedirectToLogin from '@/hooks/useRedirectToLogin';
import { getSectionById } from '@/services/axios/dataServices/CoursesDataService';

type LeftViewProps = {
  sectionid: string | undefined;
  itemid: string | undefined;
  itemType: string | undefined;
  course: ICourse;
};

function LeftView(props: LeftViewProps) {
  const { data, isError, isLoading } = useQuery(
    ['getSectionById', props.course._id, props.sectionid],
    () => getSectionById(props.course._id, props.sectionid)
  );
  const traineeId = useTraineeId();
  const redirectToLogin = useRedirectToLogin();
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <h1 className='text-danger text-center'>An error has occured while loading page</h1>
    );
  }
  if (!traineeId) {
    redirectToLogin();
    return <></>;
  }
  if (!data) {
    return <></>;
  }
  if (props.itemType === 'exercise') {
    const exercise = data.exercises.find(e => e._id === props.itemid);
    if (!exercise) {
      return <></>;
    }
    return (
      <SolveExercise
        {...exercise}
        courseId={props.course._id}
        traineeId={traineeId}
      />
    );
  }
  if (!props.itemid) {
    return <></>;
  }
  return <Video courseId={props.course._id} lessonId={props.itemid} />;
}

function CourseView() {
  const country = UseCountry();
  const traineeId = useTraineeId();
  const { courseid, sectionid, itemid, itemType } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['getEnrolledCourseById', courseid, country, traineeId],
    () => getEnrolledCourseById(traineeId, courseid)
  );
  const redirectToLogin = useRedirectToLogin();
  if (!traineeId) {
    redirectToLogin();
    return <></>;
  }
  if (isError) {
    return <h1 className='text-danger text-center'>You are not enrolled in this course</h1>;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <></>;
  }
  // console.log(data);
  const leftProps = {
    itemid,
    sectionid,
    course: data._course,
    itemType
  };
  const section = sectionid
    ? data._course.sections.find(s => s._id === sectionid)
    : data._course.sections[0];
  if (!section) {
    return <h1 className='text-danger text-center'>Section not found</h1>;
  }
  const item =
    itemType === 'exercise'
      ? itemid
        ? section.exercises.find(e => e._id === itemid)
        : section.exercises[0]
      : itemid
      ? section.lessons.find(l => l._id === itemid)
      : section.lessons[0];

  if (!item) {
    return <h1 className='text-danger text-center'>Item not found</h1>;
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12 col-md-9'>
          <div className='d-flex flex-column'>
            <div>
              <LeftView {...leftProps} />
            </div>
            <div>
              <DownView course={data._course} itemid={item._id ?? ''} />
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-3'>
          {/* <RateCourse /> */}
          <Content {...data._course} />
        </div>
      </div>
    </div>
  );
}

export default CourseView;
