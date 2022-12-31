import { MdIndeterminateCheckBox } from 'react-icons/md';

import styles from './DiscountTable.module.scss';

import { ICourse } from '@/interfaces/course.interface';

export default function DiscountTable(props: {
  data: ICourse[];
  funA: (x: ICourse) => void;
  funR: (x: ICourse) => void;
  st: Set<ICourse>;
}) {
  function handleMultipleRows(cc: ICourse) {
    if (props?.st.has(cc)) {
      //then we are removing it now
      props?.funR(cc);
    } else {
      props?.funA(cc);
    }
  }

  let i = 0;

  const toShow = props?.data?.map((course: ICourse) => {
    i++;
    const StartDate = course?.price?.discounts[0]?.startDate
      ?.toString()
      .substring(0, 10);
    const EndDate = course?.price?.discounts[0]?.endDate
      ?.toString()
      .substring(0, 10);
    const isDisabled = course?.price?.discounts?.length > 0 ? true : false;
    return (
      <tr
        key={course?._id}
        style={{ fontSize: '1rem', fontWeight: '450', color: '#393E46' }}
      >
        <td>
          <input
            disabled={isDisabled}
            id={'CheckBoasdx'.concat(
              (138191 * 10501 + -10 + 1912 + i).toString()
            )}
            style={{
              width: '1.4rem',
              height: '1.2rem',
              alignItems: 'center',
              //here was a marginTop 1rem
              marginLeft: '0.1rem'
            }}
            type='checkbox'
            onClick={() => handleMultipleRows(course)}
          />
        </td>
        <td>{course?.title}</td>
        {course?.price?.discounts?.length > 0 && (
          <>
            <td>{course?.price?.discounts?.at(0)?.percentage} % </td>
            <td>{StartDate}</td>
            <td>{EndDate}</td>
          </>
        )}
        {course?.price?.discounts?.length == 0 && (
          <>
            <td>None </td>
            <td>None</td>
            <td>None</td>
          </>
        )}
      </tr>
    );
  });

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className={styles.container}>
        <thead>
          <tr
            style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
          >
            <th>
              <MdIndeterminateCheckBox
                style={{ color: '#DC3535', fontSize: '1.5rem' }}
              />
            </th>
            <th>Course </th>
            <th>Discount Applied</th>
            <th>Start Date</th>
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>{toShow}</tbody>
      </table>
    </div>
  );
}
