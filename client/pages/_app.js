//  components
import {useState} from 'react';
import {Footer, Header} from '../components';
import '../styles/globals.css';

//  react-query
import {QueryClient, QueryClientProvider, Hydrate} from '@tanstack/react-query';

//  context
import AppProvider from '../context/AppContext';
// --------------------------------------------------------------------------

//  react- query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

//  app setting
function App({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="bg-gray-900 w-full min-h-screen">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
}

//  export app
export default App;
