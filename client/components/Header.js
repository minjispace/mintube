const Header = () => {
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
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
      >
        Logout
      </button>
    </nav>
  );
};

export default Header;
