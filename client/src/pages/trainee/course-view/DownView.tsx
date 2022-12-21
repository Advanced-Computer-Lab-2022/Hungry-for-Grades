import Navigation from './Navigation';

import Overview from './Overview';
import QandA from './QandA';
import Announcements from './Announcement';
import Notes from './Notes';

import useMultistepForm from '@/hooks/useMultistepForm';
import { ICourse } from '@/interfaces/course.interface';
type DownViewProps = {
  lessonId: string;
  course: ICourse;
};
const titles = ['Overview', 'Q&A', 'Notes', 'Announcments'];

function DownView({ lessonId, course }: DownViewProps) {
  const { step, goTo } = useMultistepForm(
    [
      <Overview key='11231313213' {...course} />,
      <QandA key='we9rw9rwe9r' {...course} />,
      <Notes
        key='sadsaasdasd34ew43'
        courseName={course.title}
        lessonId={lessonId}
      />,
      <Announcements key='sdadasdwerre654' {...course} />
    ],
    titles,
    []
  );

  return (
    <section className='container-fluid'>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-12'>
                  <Navigation goTo={goTo} />
                  <div className='container'>{step}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownView;
