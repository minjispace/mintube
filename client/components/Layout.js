import {Footer, Header} from './index';

export default function Layout({children}) {
  return (
    <div className="bg-gray-900 w-full min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
