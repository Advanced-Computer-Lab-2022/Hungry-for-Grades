import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { Link } from 'react-router-dom';

import { type ICourse } from '@/interfaces/course.interface';
import { formatDuration } from '@/utils/duration';

// eslint-disable-next-line import/no-unresolved
import '@/pages/course/accordion.scss';

function Content(props: ICourse) {
  return (
    <div className='my-3 py-5'>
      <div className={`text-dark border row`}>
        <h3 className='m-3'>Course content</h3>
      </div>
      <div
        className={`text-dark row h-100`}
        style={{ overflowY: 'scroll', overflowX: 'hidden', height: '100%' }}
      >
        <Accordion allowZeroExpanded>
          {props.sections.map((sec, sectionIndex) => (
            <AccordionItem key={sec.title}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <strong>{sec.title}</strong>

                  <p className='text-dark'>
                    <small>
                      {sec.lessons.length} lessons{' | '}
                      {formatDuration(
                        sec.lessons.reduce((sum, l) => sum + l.duration, 0)
                      )}
                    </small>
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {sec.lessons ? (
                  <ol className='list-group'>
                    {sec.lessons.map((l, lessonIndex) => (
                      <Link
                        key={l.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/lesson/${sectionIndex}/${lessonIndex}`}
                      >
                        <li className='list-item'>
                          <strong>{l.title}</strong>{' '}
                          <p className='small'>{formatDuration(l.duration)}</p>
                        </li>
                      </Link>
                    ))}
                  </ol>
                ) : (
                  <></>
                )}
                {sec.exercises ? (
                  <ol className='list-group'>
                    {sec.exercises.map((e, exerciseIndex) => (
                      <Link
                        key={e.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/exercise/${sectionIndex}/${exerciseIndex}`}
                      >
                        <li className='list-item'>
                          <strong>{e.title}</strong>{' '}
                        </li>
                      </Link>
                    ))}
                  </ol>
                ) : (
                  <></>
                )}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Content;
