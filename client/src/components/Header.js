import {useQuery} from "@tanstack/react-query";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {toast} from "react-hot-toast";
import {logoutUserData} from "../utils/axios/axiosAPI";
// ---------------------------------------------------------
const Header = () => {
  const {data: session} = useSession();
  const router = useRouter();

  //  react-query logout
  const {refetch} = useQuery({
    queryKey: ["logoutUser"],
    queryFn: logoutUserData,
    onError: (error) => toast.error(error?.response?.data?.msg),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  // return rendering
  return (
    <nav className="flex justify-between items-center px-4 py-5 text-gray-300 border  sm:flex sm:px-5  bg-gray-800 border-gray-800 fixed top-0 left-0 right-0" aria-label="Breadcrumb">
      {/*  youtube logo */}
      <div className="flex items-center">
        {/*   logo */}
        <img src="images/youtube.svg" />

        {/*  title */}
        <a href="/" className="ml-1 text-xl font-medium tracking-widest  hover:text-blue-600 md:ml-2 dark:hover:text-white">
          Minjitube
        </a>
      </div>

      {/*  button */}
      {session?.user ? (
        //  유저가 있을경우 버튼
        <div className="flex items-center">
          <h5 className="mx-3">{session.user.name}님</h5>
          {/*  logout button */}
          <button
            type={"button"}
            className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            onClick={() => {
              refetch();
              signOut();
            }}
          >
            Logout
          </button>

          {/*  setting button */}
          <Link
            className="py-2.5 px-5 mx-3  mr-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href="/setting"
          >
            Setting
          </Link>

          {/*  upload your video */}
          <Link
            className="py-2.5 px-5 mx-3  mr-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href="/video"
          >
            📹 + video
          </Link>
        </div>
      ) : (
        //  user가 없을 경우 버튼
        <div className="flex items-center">
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 mx-3 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
