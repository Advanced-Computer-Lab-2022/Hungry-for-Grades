import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import './accordion.scss';
// import styles from './course-content.module.scss';

import { type ICourse } from '@/interfaces/course.interface';
import { formatDuration } from '@/utils/duration';

function CourseContent(props: ICourse) {
  return (
    <div className={`p-5 text-dark bg-light border rounded-3 m-3`}>
      <h3>Course content</h3>
      <p className='text-dark'>
        {props.sections.length} sections &nbsp;• &nbsp;
        {props.sections.reduce((s, l) => s + l.lessons.length, 0)} lessons&nbsp;
        • &nbsp;
        {formatDuration(
          props.sections.reduce(
            (s, l) => s + l.lessons.reduce((s2, l2) => s2 + l2.duration, 0),
            0
          )
        )}
      </p>
      <Accordion allowZeroExpanded>
        {props.sections.map(sec => (
          <AccordionItem key={sec.title}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <span>
                  <span className={`text-dark`}>
                    <strong>{sec.title}</strong>
                  </span>
                  <span className='text-dark float-end'>
                    <small>
                      {sec.lessons.length} lessons •{' '}
                      {formatDuration(
                        sec.lessons.reduce((sum, l) => sum + l.duration, 0)
                      )}{' '}
                      • {sec.exercises.length} exercises
                    </small>
                  </span>
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>{sec.description}</p>
              {sec.lessons ? (
                <ol className='list-group'>
                  {sec.lessons.map((l, index) => (
                    <li key={l.title} className='list-item'>
                      <strong>Lesson #{index + 1}:</strong> {l.title}{' '}
                      <span className='float-end small'>
                        {formatDuration(l.duration)}
                      </span>
                    </li>
                  ))}
                </ol>
              ) : (
                <></>
              )}
              {sec.exercises ? (
                <ol className='list-group'>
                  {sec.exercises.map((e, index) => (
                    <li key={e.title} className='list-item'>
                      <strong>Exercise #{index + 1}:</strong> {e.title}{' '}
                      <span className='float-end small'>
                        {e.numberOfQuestions} Questions
                      </span>
                    </li>
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
  );
}

export default CourseContent;
