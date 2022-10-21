import {
  BrowserRouter as Router //it is for the browser that carry all the routes
} from 'react-router-dom';

// import Toast from './components/toast/MessageToast';
import Header from './components/header/Header';
import Routes from './routes/Routes';
import ScreenMode from './components/buttons/screenMode/ScreenMode';
import Reader from './components/reader/Reader';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Reader />
      <Header />
      <Routes />
      {/* <Toast message={'good request'} type={'success'} /> */}
      <Footer />
    </>
  );
}

function RoutedApp() {
  return (
    <Router>
      <ScreenMode />
      <App />
    </Router>
  );
}

export { App, RoutedApp };
