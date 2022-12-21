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
          'Online classes have allowed me to truly capture the essence of the course content. It really pushed my boundaries as a student to engage myself in the curriculum more than ever. There’s always a reluctance to share personal details of your life with other students in a classroom setting. Online, I found myself being more open and willing to connect to people I never met. This allowed me to understand the material and relate to what was being taught. Most importantly, I found myself creating a solid structure and routine to my life and my classes. That is something I can take with me forever. Although not every class is available for my degree program, I try to take as many online classes as possible.'}      />,
      <TestmonialCard
        key={2}
        img='2'
        jobTitle='Finance assistant'
        name={'mike'}
        rating={0}
        review={
        'I had one last class to take for my general studies core and it was only available online. After taking this course I realized that I enjoyed taking a class online and I would recommend anyone if they havent already taken an online course that they take it and experience how convenient it is and how easy it is to take and relief some of the pressure that classes on campus can bring upon you'   }
      />,
      <TestmonialCard
        key={3}
        img='3'
        jobTitle={'Engineer'}
        name={'mike'}
        rating={0}
        review={
        'Course materials were good, the mentoring approach was good, and working with other people via the Internet was good. The instructor did a good job of communicating and making it a more intimate arrangement. A lot of online courses fail because of the isolation. Kitty is very good and I think it’s a very solid course. I learned a lot.'        }
      />
    ],
    [],
    []
  );

  return (
    <section className='section mb-5' id='testimonials'>
      <div className='right-image-decor' style={{ zIndex: '-1' }} />
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
