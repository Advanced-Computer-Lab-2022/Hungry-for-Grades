import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';

// Demo styles, see 'Styles' section below for some notes on use.
import './accordion.scss';
import './course-details.scss';

function Title() {
  return <h2 className='text-dark mb-4'>Course content</h2>;
}

function CourseContent() {
  return (
    <div className='mt-3 pt-3 ml-5 px-5'>
      <Title />
      <Accordion allowZeroExpanded>
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              <span>
                <span className='text-dark space'>
                  <strong>Introduction</strong>
                </span>
                <span className='text-right text-dark'>
                  <small>3 lectures.12min</small>
                </span>
              </span>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <p>
              Exercitation in fugiat est ut ad ea cupidatat ut in cupidatat
              occaecat ut occaecat consequat est minim minim esse tempor laborum
              consequat esse adipisicing eu reprehenderit enim.
            </p>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default CourseContent;
