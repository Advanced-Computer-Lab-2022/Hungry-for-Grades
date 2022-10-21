import React from 'react';
import ReactDOM from 'react-dom/client';

// debugging
// eslint-disable-next-line import/no-unresolved
import { ClickToComponent } from 'click-to-react-component';
// styles
import './normalize.css';
import './index.css';
// Bootstrap
import './main.scss';

// QueryClient
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query Devtools
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// web vitals
//import reportWebVitals from './reportWebVitals';

// App
import { RoutedApp } from './App';

const queryClient = new QueryClient();

// eslint-disable-next-line xss/no-mixed-html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutedApp />

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    <ClickToComponent />
  </React.StrictMode>
);
/* // eslint-disable-next-line no-console
reportWebVitals(console.table);
 */
