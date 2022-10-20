import React from 'react';
import ReactDOM from 'react-dom/client';

// debugging
// eslint-disable-next-line import/no-unresolved
import { ClickToComponent } from 'click-to-react-component';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// QueryClient
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query Devtools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// web vitals
//import reportWebVitals from './reportWebVitals';

// App
import { RoutedApp } from './App';
// styles
import './index.css';
import './normalize.css';

const queryClient = new QueryClient();

// eslint-disable-next-line xss/no-mixed-html
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RoutedApp />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ClickToComponent />
  </React.StrictMode>
);
/* // eslint-disable-next-line no-console
reportWebVitals(console.table);
 */
