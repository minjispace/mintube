import {Footer, Header} from '../components';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
  return (
    <div className="bg-gray-900 w-full min-h-screen">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
