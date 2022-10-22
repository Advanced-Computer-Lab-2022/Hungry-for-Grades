import {
  BrowserRouter as Router //it is for the browser that carry all the routes
} from 'react-router-dom';

//import Reader from './components/reader/Reader';

// import Toast from './components/toast/MessageToast';
import Header from './components/header/Header';

import Routes from './routes/Routes';

import ScreenMode from './components/buttons/screenMode/ScreenMode';

import Footer from './components/footer/Footer';
import CourseSummary from './components/course-summary/CourseSummary';

import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Navbar />
      {/* <Toast message={'good request'} type={'success'} /> */}
      <CourseSummary
        discount
        isLiked
        courseID='1'
        image='./logo.png'
        instructorID='1'
        instructorName='Omar El-Meteny'
        price={15}
        priceAfter={10}
        rating={5}
        title='CSEN704'
      />
      <Footer />
    </>
  );
}

function RoutedApp() {
  return (
    <Router>
      <App />
      <ScreenMode />
    </Router>
  );
}

export { App, RoutedApp };
