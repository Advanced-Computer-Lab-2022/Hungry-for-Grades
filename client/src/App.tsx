import {
  BrowserRouter as Router //it is for the browser that carry all the routes
} from 'react-router-dom';

//import Toast from './components/toast/MessageToast';
import Header from './components/header/Header';
import Routes from './routes/Routes';
import ScreenMode from './components/buttons/screenMode/ScreenMode';
import Reader from './components/reader/Reader';

import Navbar from '@components/navbar/Navbar';

function App() {
  return (
    <>
      <Header />
      <Routes />
      <Navbar />
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
