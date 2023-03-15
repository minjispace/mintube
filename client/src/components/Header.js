import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/router";
import {logoutUserData} from "../utils/axios";
// ---------------------------------------------------------
const Header = () => {
  const {data: session} = useSession();
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-4 py-5 text-gray-300 border  sm:flex sm:px-5  bg-gray-800 border-gray-800" aria-label="Breadcrumb">
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
        <div className="flex items-center">
          <h5 className="mx-3">{session.user.name}님</h5>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            onClick={() => signOut("logout")}
          >
            Logout
          </button>

          <Link
            className="py-2.5 px-5 mx-3  mr-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href="/forgot/user/password"
          >
            Reset Password
          </Link>
        </div>
      ) : (
        <div className="flex items-center">
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="inline-flex items-center px-3 py-2 mx-3 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
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
