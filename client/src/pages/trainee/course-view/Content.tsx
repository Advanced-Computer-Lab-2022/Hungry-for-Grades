import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';
import { Link } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { type ICourse } from '@/interfaces/course.interface';
import { formatDuration } from '@/utils/duration';
import { useTraineeId } from '@/hooks/useTraineeId';
import { getViewedLessons } from '@/services/axios/dataServices/TraineeDataService';
import Loader from '@/components/loader/loaderpage/Loader';

function Content(props: ICourse) {
  const traineeId = useTraineeId();
  const { data, isLoading, isError } = useQuery(
    ['getViewedLessons', traineeId, props._id],
    () => getViewedLessons(props._id, traineeId)
  );
  if (isError) {
    return (
      <h1 className='text-center text-danger'>
        An error occured while loading the page
      </h1>
    );
  }
  if (isLoading) {
    return <Loader />;
  }
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
          {props.sections.map(sec => (
            <AccordionItem key={sec.title}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <strong>{sec.title}</strong>

                  <p className='text-dark'>
                    <small>
                      {sec.lessons.length} lessons{' | '}
                      {formatDuration(
                        sec.lessons.reduce(
                          (sum, l) => sum + (l.duration ?? 0),
                          0
                        )
                      )}
                    </small>
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {sec.lessons ? (
                  <ol className='list-group'>
                    {sec.lessons.map(l => (
                      <Link
                        key={l.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/lesson/${
                          sec._id ?? ''
                        }/${l._id ?? ''}`}
                      >
                        <li className='list-item'>
                          {data && data?.find(id => id === l._id) && (
                            <input checked className='form-check-input' type='checkbox' />
                          )}
                          {data && !data?.find(id => id === l._id) && (
                            <input checked={false} className='form-check-input' type='checkbox' />
                          )}
                          &nbsp;
                          <strong>{l.title}</strong>{' '}
                          <p className='small'>
                            {formatDuration(l.duration ?? 0)}
                          </p>
                        </li>
                      </Link>
                    ))}
                  </ol>
                ) : (
                  <></>
                )}
                {sec.exercises ? (
                  <ol className='list-group'>
                    {sec.exercises.map(e => (
                      <Link
                        key={e.title}
                        className='btn btn-light text-start'
                        to={`/trainee/view-course/${props._id}/exercise/${
                          sec._id ?? ''
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
