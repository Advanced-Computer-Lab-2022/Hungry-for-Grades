import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

import TestmonialCard from './TestmonialCard';

import Button from '@/components/buttons/button/Button';
import useMultistepForm from '@/hooks/useMultistepForm';
import './testmonial.scss';
function TestmonialSection() {
  const { next, prev, step, isFirstStep, isLastStep } = useMultistepForm(
    [
      <TestmonialCard
        key={1}
        jobTitle={'Web Developer'}
        name={'Jack'}
        rating={0}
        review={
          'Lorem ipsum dolor sit consectetur adipisicing elit. Aliquid totam voluptatem quod expedita obcaecati dicta quas maiores delectus iure atque tempore, deleniti debitis exercitationem, officiis quisquam sapiente est dolores non?				'
        }
      />,
      <TestmonialCard
        key={2}
        jobTitle={''}
        name={'mike'}
        rating={0}
        review={
          'Lorem ipsum dolor sit t consectetur adipisicing elit. Aliquid totam voluptatem quod expedita obcaecati dicta quas maiores delectus iure atque tempore, deleniti debitis exercitationem, officiis quisquam sapiente est dolores non?				'
        }
      />,
      <TestmonialCard
        key={3}
        jobTitle={''}
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
          <div className='col-2'>
            {!isFirstStep && (
              <span className='testmonial-btn-prev'>
                <Button
                  isDisabled
                  backgroundColor={'primary-bg'}
                  label={''}
                  name={'back'}
                  type={'button'}
                  onClickFunc={prev}
                >
                  <GrFormPrevious />
                </Button>
              </span>
            )}
            {!isLastStep && (
              <span className='testmonial-btn-next'>
                <Button
                  isDisabled
                  backgroundColor={'primary-bg'}
                  label={''}
                  name={'next'}
                  type={'button'}
                  onClickFunc={next}
                >
                  <GrFormNext />
                </Button>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestmonialSection;
