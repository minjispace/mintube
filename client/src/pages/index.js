import {useSession} from "next-auth/react";
import {Header, ListProduct, SearchForm} from "../components";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div className="bg-gray-900 w-full h-screen">
      <SearchForm />
      <ListProduct />
    </div>
  );
}
