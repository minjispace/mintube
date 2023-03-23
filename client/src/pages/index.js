import {useSession} from "next-auth/react";
import {ListProduct} from "../components";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div className="bg-gray-900 w-100 min-h-screen grid justify-center ">
      <ListProduct realUser={session?.user} />
    </div>
  );
}
