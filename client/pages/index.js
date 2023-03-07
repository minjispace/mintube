import {ListProduct, SearchForm} from '../components';

export default function Home() {
  return (
    <>
      <h1 className="text-white"> protected home</h1>
      <SearchForm />
      <ListProduct />
    </>
  );
}
