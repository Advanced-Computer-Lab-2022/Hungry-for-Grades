import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

import { ICourse } from '@/interfaces/course.interface';
import { formatDuration } from '@/utils/duration';
import '@/pages/course/accordion.scss';

// function OpenVideo(videoURL: string) {
//   return (
//     <iframe
//         height='315'
//         src={videoURL}
//         title={videoURL}
//         width='420'
//     />
//   );
// }

function Content(props: ICourse) {
  return (
    <div className='col m-3 p-5'>
      <div className={`text-dark border row`}>
        <h3 className='m-3'>Course content</h3>
      </div>
      <div className={`text-dark row`}>
        <Accordion allowZeroExpanded>
          {props.sections.map(sec => (
            <AccordionItem key={sec.title}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <span>
                    <p className={`text-dark`}>
                      <strong>{sec.title}</strong>
                    </p>
                    <p className='text-dark'>
                      <small>
                        {sec.lessons.length} lessons{' | '}
                        {formatDuration(
                          sec.lessons.reduce((sum, l) => sum + l.duration, 0)
                        )}
                      </small>
                    </p>
                  </span>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {sec.lessons ? (
                  <ol className='list-group'>
                    {sec.lessons.map(l => (
                      <button
                        key={l.title}
                        className='btn btn-light text-start'
                        type='button'
                      >
                        <li className='list-item'>
                          <strong>{l.title}</strong>{' '}
                          <p className='small'>{formatDuration(l.duration)}</p>
                        </li>
                      </button>
                    ))}
                  </ol>
                ) : (
                  <></>
                )}
                {sec.exercises ? (
                  <ol className='list-group'>
                    {sec.exercises.map((e, index) => (
                      <button
                        key={e.title}
                        className='btn btn-light text-start'
                        type='button'
                      >
                        <li className='list-item'>
                          <strong>Exercise #{index + 1}:</strong> {e.title}{' '}
                        </li>
                      </button>
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
