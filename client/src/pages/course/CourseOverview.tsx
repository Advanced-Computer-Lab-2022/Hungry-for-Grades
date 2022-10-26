import styles from './course-overview.module.scss';

import Button from '@/components/buttons/button/Button';

function CourseOverview() {
  return (
    <div className={`mt-3 pt-3 ml-5 px-5 ${styles['overview-design'] ?? ''}`}>
      <h2>Course overview</h2>
      <ul className={`text-dark m-2 ${styles['list-design'] ?? ''}`}>
        <li className='m-1'>point1</li>
        <li className='m-1'>point2</li>
        <li className='m-1'>point3</li>
        <li className='m-1'>point4</li>
      </ul>
      <Button
        isDisabled
        backgroundColor='primary-bg'
        label='Show full overview'
        name='omar'
        type='button'
      />
    </div>
  );
}

export default CourseOverview;
