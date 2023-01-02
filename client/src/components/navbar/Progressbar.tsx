import {
	buildStyles,
	CircularProgressbarWithChildren
  } from 'react-circular-progressbar';

  import { BsFillTrophyFill } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';

import './progress.scss';
import { UseUserGetProgressBar } from '@/store/userStore';
function Progressbar() {

	const progressBar = UseUserGetProgressBar()();

	const location = useLocation();
	const { courseid } = useParams();
  return (
	<>
	{progressBar &&
          courseid &&
          location.pathname.includes(`/trainee/view-course/`) && (
            <Link
              to={
                progressBar === 100
                  ? `/trainee/certificate/${courseid}`
                  : location.pathname
              }
            >
              <div
                style={{
                  width: '3rem',
                  height: '3rem'
                }}
              >
                <CircularProgressbarWithChildren
                  background
                  backgroundPadding={3}
                  className='progressbar'
                  maxValue={100}
                  minValue={0}

                  styles={buildStyles({
                    backgroundColor: 'transparent',
                    textColor: 'var(--primary-color)',
                    pathColor: 'var(--primary-color)',
                    trailColor: 'var(--grey)',
                    pathTransitionDuration: 0.5
                  })}
                  value={progressBar}
                >
                  <div className='position-relative'>
                    <BsFillTrophyFill
					className='progressbar'

                    />
                    <p
                      className='position-absolute text-white bg-secondary badge rounded-pill'
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: '800',
                        top: '115%',
                        left: '-25%'
                      }}
                    >
                      {' '}
                      {progressBar}%
                    </p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
            </Link>
          )}
	</>
  )
}

export default Progressbar