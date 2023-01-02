import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';
import { FaPaintBrush } from 'react-icons/fa';
import { VscReport } from 'react-icons/vsc';

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
  Reports: { path: '/trainee/reports', icon: <VscReport /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> }
};

const traineeLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/enrolled-courses', icon: <BsFillBookFill /> },
  Cart: { path: '/trainee/cart', icon: <HiShoppingCart /> },
  Wishlist: { path: '/trainee/wishlist', icon: <AiFillHeart /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  //Payment: { path: '/trainee/payment', icon: <AiFillCreditCard /> },
  Board: { path: '/trainee/board', icon: <FaPaintBrush /> },
  Reports: { path: '/trainee/reports', icon: <VscReport /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> }
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
