import React from 'react';

import ReactDOM from 'react-dom/client';

// debugging
// eslint-disable-next-line import/no-unresolved
import { ClickToComponent } from 'click-to-react-component';
// styles
import './index.css';
import './normalize.css';
// Bootstrap
// Bootstrap is already included in main.scss, do not include it again
import './main.scss';

// QueryClient
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Query Devtools
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// web vitals
//import reportWebVitals from './reportWebVitals';

// App
import { RoutedApp } from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000
    }
  }
});

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
