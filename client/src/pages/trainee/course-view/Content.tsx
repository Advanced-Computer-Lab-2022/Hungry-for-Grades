import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { Link } from 'react-router-dom';

import { type ICourse } from '@/interfaces/course.interface';
import { formatDuration } from '@/utils/duration';

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
          {props.sections.map(section => (
            <AccordionItem key={section.title}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <strong>{section.title}</strong>

                  <p className='text-dark'>
                    <small>
                      {section.lessons.length} lessons{' | '}
                      {formatDuration(
                        section.lessons.reduce((sum, l) => sum + l.duration, 0)
                      )}
                    </small>
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {section.lessons ? (
                  <ol className='list-group'>
                    {section.lessons.map(lesson => (
                      <Link
                        key={lesson.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/lesson/${
                          section._id ?? ''
                        }/${lesson._id ?? ''}`}
                      >
                        <li className='list-item'>
                          <strong>{lesson.title}</strong>{' '}
                          <p className='small'>
                            {formatDuration(lesson.duration)}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </ol>
                ) : (
                  <></>
                )}
                {section.exercises ? (
                  <ol className='list-group'>
                    {section.exercises.map(e => (
                      <Link
                        key={e.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/exercise/${
                          section._id ?? ''
                        }/${e._id ?? ''}`}
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
