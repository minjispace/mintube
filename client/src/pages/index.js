import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {ListProduct, SearchForm} from "../components";
import Login from "./login";

export default function Home() {
  return (
    <div className="bg-gray-900 w-full h-screen">
      <SearchForm />
      <ListProduct />
    </div>
  );
}
