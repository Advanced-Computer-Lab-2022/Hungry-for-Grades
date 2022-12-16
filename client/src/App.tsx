import {
  BrowserRouter as Router //it is for the browser that carry all the routes
} from 'react-router-dom';

//import Reader from './components/reader/Reader';

// import Toast from './components/toast/MessageToast';


import Header from './components/header/Header';
import Toast from './components/toast/MessageToast';

import Routes from './routes/Routes';





function App() {
  return (
    <>
      <Header />
      <Routes />
      <Toast />
    </>
  );
}

function RoutedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export { App, RoutedApp };
