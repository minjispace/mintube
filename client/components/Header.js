const Header = () => {
  return (
    <nav class="justify-between px-4 py-3 text-gray-700 border border-gray-200 rounded-b-xl  sm:flex sm:px-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      {/*  title */}
      <a href="#" class="ml-1 text-xl font-medium tracking-widest text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
        Minjitube
      </a>

      {/*  button */}
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        class="inline-flex items-center px-3 py-2 text-sm font-normal text-center text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 dark:focus:ring-gray-700"
      >
        Logout
      </button>
    </nav>
  );
};

export default Header;
