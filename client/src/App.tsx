import {
  BrowserRouter as Router //it is for the browser that carry all the routes
} from 'react-router-dom';

//import Reader from './components/reader/Reader';

import Navbar from './components/navbar/Navbar';

// import Toast from './components/toast/MessageToast';
import Header from './components/header/Header';

import Routes from './routes/Routes';

import ScreenMode from './components/buttons/screenMode/ScreenMode';

import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Navbar />
      {/* <Toast message={'good request'} type={'success'} /> */}
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
