import './nav-button.scss';

import Trainees from './trainees/Trainees';

import Instructors from './instructors/Instructors';

import useMultistepForm from '@/hooks/useMultistepForm';

const backStyle = {
  filter: 'drop-shadow(0 0 0.1rem #eee)',
  borderRadius: '0.25rem',
  boxShadow: ' 0 5px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: 'white'
};
export default function Home() {
  const { currentStepIndex, goTo, step, titles } = useMultistepForm(
    [<Trainees key='123' />, <Instructors key='instructors-admin-dashboard' />],
    ['Trainees', 'Instructors'],
    ['']
  );

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#F8F9FA'
      }}
    >
      <div className='container p-5' style={backStyle}>
        <div className='d-flex justify-content-between'>
          <div className='container d-flex flex-row justify-content-center mb-4'>
            {titles?.map((title, index) => (
              <button
                key={title}
                className={`navButton ${
                  currentStepIndex === index ? 'activeNavButton' : ''
                }`}
                type='button'
                onClick={function go() {
                  goTo(index);
                }}
              >
                {title}
              </button>
            ))}
          </div>
        </div>
        <div className='container mb-4'>{step}</div>
      </div>
    </div>
  );
}
