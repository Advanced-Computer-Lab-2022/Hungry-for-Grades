import { Link } from 'react-router-dom';

import { Instructor } from '@/interfaces/course.interface';
import { IUser } from '@/interfaces/user.interface';

type InstructorsProps = {
  instructor: Instructor | Instructor[];
  linkClassName?: string;
};

function Instructors(props: InstructorsProps) {
  let users: IUser[];
  if (Array.isArray(props.instructor)) {
    users = props.instructor.reduce(
      (prev, curr) =>
        Array.isArray(curr._user)
          ? [...prev, ...curr._user]
          : [...prev, curr._user],
      [] as IUser[]
    );
  } else {
    users = Array.isArray(props.instructor._user)
      ? props.instructor._user
      : [props.instructor._user];
  }
  return (
    <span>
      {users.map((user, index) => (
        <span key={user._id}>
          <Link
            className={props.linkClassName}
            title={user.name}
            to={`/instructor/${user._id}`}
          >
            {user.name}
          </Link>
          {index < users.length - 1 ? `, ` : ``}
        </span>
      ))}
    </span>
  );
}

Instructors.defaultProps = {
  linkClassName: 'text-secondary'
};

export default Instructors;
