import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

import Content from './Content';

import Video from './Video';

import SolveExercise from './SolveExercise';

import { UseCountry } from '@/store/countryStore';
import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { ICourse } from '@/interfaces/course.interface';

type LeftViewProps = {
  sectionIndex: number;
  itemIndex: number;
  itemType: string | undefined;
  course: ICourse;
};

function LeftView(props: LeftViewProps) {
  const section = props.course.sections[props.sectionIndex];
  if (!section) {
    return <></>;
  }
  if (props.itemType === 'exercise') {
    const exercise = section.exercises[props.itemIndex];
    if (!exercise) {
      return <></>;
    }
    return <SolveExercise {...exercise} />;
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
    ['courseByID', courseid, country],
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

  const leftProps = {
    itemIndex: itemNumber ? parseInt(itemNumber, 10) : 0,
    sectionIndex: sectionNumber ? parseInt(sectionNumber, 10) : 0,
    course: data,
    itemType
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col col-md-8'>
          <LeftView {...leftProps} />
        </div>
        <div className='col col-md-4'>
          <Content {...data} />
        </div>
      </div>
    </div>
  );
}

export default CourseView;
