
import { RiDashboardFill } from 'react-icons/ri';
import { BsFillBookFill } from 'react-icons/bs';
import { AiFillHeart, AiFillCreditCard } from 'react-icons/ai';
import { BiNote } from 'react-icons/bi';
import { HiShoppingCart } from 'react-icons/hi';
import { FiUser } from 'react-icons/fi';


import Dashboard from '@/components/dashboard/Dashboard';
import MusicPlayer from '@/components/mediaPlayer/Music';


const navLinks = {
  Dashboard: { path: '/trainee/dashboard', icon: <RiDashboardFill /> },
  Courses: { path: '/trainee/enrolled-courses', icon: <BsFillBookFill /> },
  Wishlist: { path: '/trainee/wishlist', icon: <AiFillHeart /> },
  Cart: { path: '/trainee/cart', icon: <HiShoppingCart /> },
  Notes: { path: '/trainee/notes', icon: <BiNote /> },
  Payment: { path: '/trainee/payment', icon: <AiFillCreditCard /> },
  Profile: { path: '/trainee/profile', icon: <FiUser /> }
};
function TraineeDashboard() {
  return <Dashboard media={<MusicPlayer/>} navLinks={navLinks} title='My Learning'/>;
}
export default TraineeDashboard;
