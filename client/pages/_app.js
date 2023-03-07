//  components
import {Layout} from '../components';
import '../styles/globals.css';

//  react-query
import AppProvider from '../context/AppContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

//--------------------------------------------------------------

//  react- query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24,
      retry: false,
    },
  },
});

//  app setting
function App({Component, pageProps}) {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AppProvider>
  );
}

//  export app
export default App;
