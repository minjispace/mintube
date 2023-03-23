import {useSession} from "next-auth/react";
import {ListProduct} from "../components";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div className="bg-gray-900 w-screen grid justify-center">
      <ListProduct realUser={session?.user} />
    </div>
  );
}
