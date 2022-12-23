import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillHeart, AiFillCreditCard } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { FaPaintBrush } from 'react-icons/fa';

import Dashboard from '@/components/dashboard/Dashboard';
import MusicPlayer from '@/components/mediaPlayer/Music';
import { UseUser } from '@/store/userStore';
import { ITrainee } from '@/interfaces/course.interface';

const corpLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/enrolled-courses', icon: <BsFillBookFill /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  //Payment: { path: '/trainee/payment', icon: <AiFillCreditCard /> },
  Board: { path: '/trainee/board', icon: <FaPaintBrush /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> },
  Reports: { path: '/trainee/my-reports', icon: <></> }
};

const traineeLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/enrolled-courses', icon: <BsFillBookFill /> },
  Wishlist: { path: '/trainee/wishlist', icon: <AiFillHeart /> },
  Cart: { path: '/trainee/cart', icon: <HiShoppingCart /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  //Payment: { path: '/trainee/payment', icon: <AiFillCreditCard /> },
  Board: { path: '/trainee/board', icon: <FaPaintBrush /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> },
  Reports: { path: '/trainee/my-reports', icon: <></> }
};

function TraineeDashboard() {
  const user = UseUser();

  return (
    <Dashboard
      media={<MusicPlayer />}
      navLinks={(user as ITrainee)?.isCorporate ? corpLinks : traineeLinks}
      title='My Learning'
    />
  );
}
export default TraineeDashboard;
