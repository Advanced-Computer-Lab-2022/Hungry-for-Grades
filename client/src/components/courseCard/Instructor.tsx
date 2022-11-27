import { Link } from 'react-router-dom';

import { Instructor } from '@/interfaces/course.interface';

type InstructorsProps = {
  instructors: Instructor[];
  linkClassName?: string;
};

function Instructors(props: InstructorsProps) {
  return (
    <span>
      {props.instructors.map((i, index) => (
        <span key={i._id}>
          <Link
            className={props.linkClassName}
            title={i.name}
            to={`/instructor/${i._id}`}
          >
            {i.name}
          </Link>
          {index < props.instructors.length - 1 ? `, ` : ``}
        </span>
      ))}
    </span>
  );
}

Instructors.defaultProps = {
  linkClassName: 'text-secondary'
};

export default Instructors;
