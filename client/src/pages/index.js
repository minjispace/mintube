import {useSession} from "next-auth/react";
import {ListProduct} from "../components";

export default function Home() {
  const {data: session} = useSession();

  return (
    <div className="bg-gray-900 w-full h-screen">
      <ListProduct realUser={session?.user} />
    </div>
  );
}
