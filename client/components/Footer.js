const Footer = () => {
  return (
    <footer className=" fixed left-0 right-0 bottom-0 w-full p-4 bg-white rounded-t-lg   md:p-6 dark:bg-gray-800">
      <span className="text-sm text-gray-500 sm:text-center  dark:text-gray-400">
        © 2023{' '}
        <a href="/" className="hover:underline">
          Mintube
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export default Footer;
