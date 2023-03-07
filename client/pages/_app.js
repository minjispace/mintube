//  components
import {Footer, Header, Layout} from '../components';
import '../styles/globals.css';

//  react-query
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import Register from './register';
import Link from 'next/link';

//  next-auth

// --------------------------------------------------------------------------
import {QueryCache} from '@tanstack/react-query';

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onSettled: (data, error) => {
    console.log(data, error);
  },
});

const query = queryCache.find({queryKey: ['registerUser']});

console.log(query, 'query');

//  react- query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

//  app setting
function App({Component, pageProps}) {
  if (pageProps.protected) {
    return (
      <div className="text-center w-screen h-screen m-auto my-20">
        <h1 className="">sorry. you don't have any access.</h1>
        <Link
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 my-9 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-10 "
          href="/register"
        >
          register user
        </Link>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

//  export app
export default App;
