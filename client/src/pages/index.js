import {ListProduct, SearchForm} from "../components";

export default function Home() {
  return (
    <div className="bg-gray-900 w-full h-screen">
      <SearchForm />
      <ListProduct />
    </div>
  );
}
