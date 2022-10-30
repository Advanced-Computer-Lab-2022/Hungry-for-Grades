import styles from './InstructorCourseCard.module.css';

function InstructorCourseCard() {
  return (
    <div>
      <div
        className='row border border-primary mx-auto'
        style={{ height: '8rem', maxWidth: '90vw' }}
      >
        <div
          className='col-4 d-flex align-center my-auto'
          style={{ paddingLeft: '0' }}
        >
          <div style={{ width: '8rem' }}>
            <img
              alt='course'
              className='img-fluid'
              src={
                'https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg'
              }
              style={{
                height: '7.7rem',
                objectFit: 'cover'
              }}
            />
          </div>

          <div
            className='p-2 d-flex flex-column justify-content-around'
            style={{ width: '70%' }}
          >
            <h6 className={styles.courseTitle}>
              Learn Python: The Complete Python Programming Course
            </h6>
            <div className='d-flex align-items-center justify-content-between'>
              <div
                className={`bg-primary px-2 rounded-pill
                 ${styles.fnt_sm || ''}`}
              >
                live
              </div>
              <div className={styles.fnt_sm}>$16.99</div>
            </div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={`col ${styles.altCol || ''}`}>
          <div className={styles.sec}>
            <div className={styles.partOne}>Total earned</div>
            <div>$35.69</div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={`col ${styles.altCol || ''}`}>
          <div className={styles.sec}>
            <div className={styles.partOne}>Enrolled students</div>
            <div>15</div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={`col ${styles.altCol || ''}`}>
          <div className={styles.sec}>
            <div className={styles.partOne}>Course rating</div>
            <div>4.6</div>
          </div>
        </div>
        <hr className={styles.hr} />
        <div className={`col ${styles.altCol || ''}`}>
          <div className={styles.sec}>
            <div className={styles.partOne}>Unanswered questions</div>
            <div>2</div>
          </div>
        </div>
      </div>
      {/* <table className='table border m-1 text-center'>
        <tbody>
          <tr>
            <td className='p-2' style={{ height: '12rem', width: '12rem' }}>
              <img
                alt='course'
                className='my-auto'
                src={
                  'https://img-c.udemycdn.com/course/750x422/394676_ce3d_5.jpg'
                }
                style={{ maxHeight: '12rem', width: '12rem' }}
              />
            </td>
            <td>
              <tr>Learn Python: The Complete Python Programming Course</tr>
              <tr>Avinash Jain, The Codex</tr>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default InstructorCourseCard;
