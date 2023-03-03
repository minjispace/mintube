const Form = ({type, field}) => {
  return (
    <form className="w-secreen grid justify-center items-center mb-5 ">
      <label htmlFor={field} className="mb-2 text-l font-medium text-white ">
        {field} :
      </label>
      <input
        type={field}
        id={field}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 tracking-wider "
        placeholder={field === 'email' ? 'minji@gmail.com' : ''}
        required
      />
    </form>
  );
};

export default Form;
