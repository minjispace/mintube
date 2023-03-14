// components
import "../styles/globals.css";

//  react-query
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Header} from "../components";

// next-auth
import {SessionProvider} from "next-auth/react";

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
function App({Component, pageProps: {session, ...pageProps}}) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

//  export app
export default App;
