import Navigation from './Navigation';

import Overview from './Overview';
import QandA from './QandA';
import Announcements from './Announcement';
import Notes from './Notes';

import useMultistepForm from '@/hooks/useMultistepForm';
import { ICourse } from '@/interfaces/course.interface';
type DownViewProps = {
  itemid: string;
  course: ICourse;
};
const titles = ['Overview', 'Q&A', 'Notes', 'Announcements'];

function DownView({ itemid, course }: DownViewProps) {
  const { step, goTo } = useMultistepForm(
    [
      <Overview key={`Overview${itemid}`} {...course} />,
      <QandA key={`QandA${itemid}`} {...course} />,
      <Notes
        key={`Notes${itemid}`}
        courseName={course.title}
        lessonId={itemid}
      />,
      <Announcements key={`Announcements${itemid}`} {...course} />
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
