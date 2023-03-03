import React from 'react';

const SubmitButton = ({type}) => {
  let typeButton;
  typeButton = type === 'register' ? 'register user' : 'login user';

  return (
    <button
      type={typeButton}
      className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-10 "
    >
      {typeButton}
    </button>
  );
};

export default SubmitButton;
