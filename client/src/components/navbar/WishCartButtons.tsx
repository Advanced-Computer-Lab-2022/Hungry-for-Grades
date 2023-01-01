import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';

import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';

import { BsFillTrophyFill } from 'react-icons/bs';

import styles from './wish-cart-buttons.module.scss';

import { UseCartStoreTotalItems } from '@store/cartStore';
import { UseWishListTotalItems } from '@store/wishListStore';

import toSmallNumber from '@utils/toSmallNumber';

import './progress.scss'

import 'react-circular-progressbar/dist/styles.css';
import { UseUserGetProgressBar } from '@store/userStore';
function WishCartButtons() {
  const progressBar = UseUserGetProgressBar()();
  const cartCount = UseCartStoreTotalItems();
  const wishListCount = UseWishListTotalItems();
	const location=useLocation();
	const {courseid}=useParams();
  return (
    <>
      <div className='d-flex flex-row justify-content-between'>

			{progressBar && courseid && location.pathname.includes(`/trainee/view-course/`)&& (
				<Link to={progressBar ===100?`/trainee/certificate/${courseid}`:location.pathname} >
					<div style={{
						width:'3rem',
						height:'3rem',
					}}>
      <CircularProgressbarWithChildren  background backgroundPadding={3} className='progressbar' maxValue={100}  minValue={0}
			styles={buildStyles({
				backgroundColor: 'transparent',
				textColor: 'var(--primary-color)',
				pathColor: 'var(--primary-color)',
				trailColor: 'var(--grey)',
				pathTransitionDuration: 0.5,

			})}
			value={progressBar}>
				<div className='position-relative'>
			<BsFillTrophyFill style={{
				color: 'var(--primary-color)',
				fontSize: '1.5rem',
				fill:'50%'
			}}/>
			<p className='position-absolute text-white bg-secondary badge rounded-pill'
			style={{

				fontSize:'0.8rem',
				fontWeight:'800',
				top:'115%',
				left:'-25%',

			}}

			>			{progressBar}%
</p>
</div>

			</CircularProgressbarWithChildren>

				</div>
				</Link>
				)}
        <NavLink className='mt-2' to='/trainee/cart'>
          <p className='position-relative'>
            <AiOutlineShoppingCart className={styles.icon} />
            {cartCount > 0 && (
              <span
                className={`${
                  styles.rightTop ?? ''
                } text-white badge rounded-pill bg-secondary`}
              >
                +{toSmallNumber(cartCount)}
              </span>
            )}
          </p>
        </NavLink>
        <NavLink className='mt-2 p-0' to='/trainee/wishlist'>
          <p className='p-0  position-relative'>
            <AiOutlineHeart className={styles.icon} />
            {wishListCount > 0 && (
              <span
                className={`${
                  styles.rightTop ?? ''
                } text-white badge rounded-pill bg-secondary`}
              >
                +{toSmallNumber(wishListCount)}
              </span>
            )}
          </p>
        </NavLink>

      </div>
    </>
  );
}

export default WishCartButtons;
