import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import TestmonialCard from './TestmonialCard';

import useMultistepForm from '@/hooks/useMultistepForm';
import './testmonial.scss';
function TestmonialSection() {
  const { next, prev, step, isFirstStep, isLastStep } = useMultistepForm(
    [
      <TestmonialCard
        key={1}
        img='1'
        jobTitle={'Web Developer'}
        name={'Jack'}
        rating={0}
        review={
          'Lorem ipsum dolor sit consectetur adipisicing elit. Aliquid totam voluptatem quod expedita obcaecati dicta quas maiores delectus iure atque tempore, deleniti debitis exercitationem, officiis quisquam sapiente est dolores non?				'
        }
      />,
      <TestmonialCard
        key={2}
        img='2'
        jobTitle='Finance assistant'
        name={'mike'}
        rating={0}
        review={
          'Lorem ipsum dolor sit t consectetur adipisicing elit. Aliquid totam voluptatem quod expedita obcaecati dicta quas maiores delectus iure atque tempore, deleniti debitis exercitationem, officiis quisquam sapiente est dolores non?				'
        }
      />,
      <TestmonialCard
        key={3}
        img='3'
        jobTitle={'Engineer'}
        name={'mike'}
        rating={0}
        review={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid totam voluptatem quod expedita obcaecati dicta quas maiores delectus iure atque tempore, deleniti debitis exercitationem, officiis quisquam sapiente est dolores non?				'
        }
      />
    ],
    [],
    []
  );

  return (
    <section className='section' id='testimonials'>
      <div className='right-image-decor' />
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 offset-lg-2'>
            <div className='center-heading'>
              <h2>
                What They Think <em>About Us</em>
              </h2>
              <p>
                Suspendisse vitae laoreet mauris. Fusce a nisi dapibus, euismod
                purus non, convallis odio. Donec vitae magna ornare,
                pellentesque ex vitae, aliquet urna.
              </p>
            </div>
          </div>
          <div className='col-lg-10 col-md-12 col-sm-12'>{step}</div>
          <div className='d-flex justify-content-end'>
            <span className='testmonial-btn-prev'>
              <button
                className='btn btn-secondary btn-lg'
                disabled={isFirstStep}
                type='button'
                onClick={prev}
              >
                <GrFormPrevious />
              </button>
            </span>
            <span className='testmonial-btn-next'>
              <button
                className='btn btn-primary btn-lg'
                disabled={isLastStep}
                name={'next'}
                type={'button'}
                onClick={next}
              >
                <GrFormNext />
              </button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestmonialSection;
