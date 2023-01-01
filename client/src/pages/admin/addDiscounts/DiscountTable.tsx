import { useState } from 'react';

import styles from './DiscountTable.module.scss';

import { ICourse } from '@/interfaces/course.interface';

export default function DiscountTable(props: {
  data: ICourse[];
  funA: (x: ICourse) => void;
  funR: (x: ICourse) => void;
  st: Set<ICourse>;
  clearSet: () => void;
}) {
  const [all, setAll] = useState<boolean>(false);

  function handleMultipleRows(cc: ICourse) {
    if (props?.st.has(cc)) {
      //then we are removing it now
      setAll(false);
      props?.funR(cc);
    } else {
      props?.funA(cc);
    }
  }

  function SelectAll() {
    if (!all) {
      for (let i = 0; i < props?.data?.length; ++i) {
        if ((props?.data[i]?.price?.discounts?.length as number) == 0)
          props?.funA(props?.data[i] as ICourse);
      }
    } else {
      props?.clearSet();
    }
    setAll(!all);
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
            checked={(all || props?.st?.has(course)) && !isDisabled}
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
      <table className={`${styles.container ?? ''} table table-hover`}>
        <thead>
          <tr
            style={{ fontWeight: '600', fontSize: '1rem', paddingLeft: '1rem' }}
          >
            <th>
              <input
                checked={all}
                className='form-check-input'
                style={{
                  width: '1.4rem',
                  height: '1.2rem',
                  alignItems: 'center',
                  //here was marginTop 1rem
                  marginLeft: '0.1rem'
                }}
                type='checkbox'
                onClick={() => SelectAll()}
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
