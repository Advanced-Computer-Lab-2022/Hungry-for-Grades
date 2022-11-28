import Navigation from './Navigation';

import Overview from './Overview';
import QandA from './QandA';
import Announcments from './Announcment';
import Notes from './Notes';

import useMultistepForm from '@/hooks/useMultistepForm';
type DownViewProps = {
  lessonId: string;
  courseName: string;
};
const titles = ['Overview', 'Q&A', 'Notes', 'Announcments'];

function DownView({ lessonId, courseName }: DownViewProps) {
  const { step, goTo } = useMultistepForm(
    [
      <Overview key='11231313213' />,
      <QandA key='we9rw9rwe9r' />,
      <Notes
        key='sadsaasdasd34ew43'
        courseName={courseName}
        lessonId={lessonId}
      />,
      <Announcments key='sdadasdwerre654' />
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
