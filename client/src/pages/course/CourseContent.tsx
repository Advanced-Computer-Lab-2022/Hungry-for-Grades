import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import './accordion.scss';
// import styles from './course-content.module.scss';

import { Course } from '@/services/axios/dataServices/CoursesDataService';

function CourseContent(props: Course) {
  return (
    <div className={`p-5 text-dark bg-light border rounded-3 m-3`}>
      <h3>Course content</h3>
      <p className='text-dark'>
        {props.sections.length} sections &nbsp;• &nbsp;
        {props.sections.reduce((s, l) => s + l.lessons.length, 0)} lessons&nbsp;
        • &nbsp;
        {props.sections.reduce(
          (s, l) => s + l.lessons.reduce((s2, l2) => s2 + l2.duration, 0),
          0
        )}{' '}
        mins
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
                      {sec.lessons.reduce((sum, l) => sum + l.duration, 0)}min
                    </small>
                  </span>
                </span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>{sec.description}</p>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default CourseContent;
