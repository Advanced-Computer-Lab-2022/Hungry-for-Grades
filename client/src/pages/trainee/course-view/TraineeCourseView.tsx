import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import Content from './Content';

import Video from './Video';

import SolveExercise from './SolveExercise';

import DownView from './DownView';

// import RateCourse from './RateCourse';

import { UseCountry } from '@/store/countryStore';
import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { ICourse } from '@/interfaces/course.interface';
import { useTraineeId } from '@/hooks/useTraineeId';

type LeftViewProps = {
  sectionIndex: number;
  itemIndex: number;
  itemType: string | undefined;
  course: ICourse;
};

function LeftView(props: LeftViewProps) {
  const section = props.course.sections[props.sectionIndex];
  const traineeId = useTraineeId();
  if (!section) {
    return <></>;
  }
  if (props.itemType === 'exercise') {
    const exercise = section.exercises[props.itemIndex];
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
  const lesson = section.lessons[props.itemIndex];
  if (!lesson) {
    return <></>;
  }
  return <Video {...lesson} />;
}

function CourseView() {
  const country = UseCountry();
  const { courseid, sectionNumber, itemNumber, itemType } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['getCourseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );
  if (isError) {
    return (
      <h1 className='text-danger text-center'>
        An error has occurred while loading course view.
      </h1>
    );
  }
  if (isLoading) {
    return <div className='text-info text-center'>Loading course view...</div>;
  }
  if (!data) {
    return <></>;
  }
  console.log(data);

  const leftProps = {
    itemIndex: itemNumber ? parseInt(itemNumber, 10) : 0,
    sectionIndex: sectionNumber ? parseInt(sectionNumber, 10) : 0,
    course: data,
    itemType
  };
  if (!data.sections[leftProps.sectionIndex]) {
    return <h1 className='text-danger text-center'>Section not found</h1>;
  }
  if (
    !data.sections[leftProps.sectionIndex]?.lessons[leftProps.itemIndex] &&
    !data.sections[leftProps.sectionIndex]?.exercises[leftProps.itemIndex]
  ) {
    return <h1 className='text-danger text-center'>Item not found</h1>;
  }
  let lessonId = '';
  if (itemType === 'exercise') {
    lessonId =
      data.sections[leftProps.sectionIndex]?.exercises[leftProps.itemIndex]
        ?._id ?? '';
  } else {
    lessonId =
      data.sections[leftProps.sectionIndex]?.lessons[leftProps.itemIndex]
        ?._id ?? '';
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
              <DownView course={data} lessonId={lessonId} />
            </div>
          </div>
        </div>
        <div className='col-sm-12 col-md-3'>
          {/* <RateCourse /> */}
          <Content {...data} />
        </div>
      </div>
    </div>
  );
}

export default CourseView;
