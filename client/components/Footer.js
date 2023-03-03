const Footer = () => {
  return (
    <footer className=" fixed left-0 right-0 bottom-0 w-full p-4   md:p-6 bg-gray-800">
      <span className="text-ml  sm:text-center text-gray-300">
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
