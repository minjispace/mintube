import {useSession} from "next-auth/react";

const FormRow = ({content, type, name, value, onChange, mode}) => {
  const {data: session} = useSession();

  const handlePlaceholder = () => {
    let result;
    if (name === "name") {
      result = session?.user?.name;
    }
    if (name === "title") {
      result = content;
    }
    if (name === "description") {
      result = content;
    }
    if (mode === "edit") {
      result = content;
    }
    return result;
  };

  return (
    <>
      <label htmlFor={name} className="mb-2 text-l font-medium text-white ">
        {type} :
      </label>
      <input
        type={type}
        value={value}
        placeholder={handlePlaceholder()}
        name={name}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 tracking-wider my-2 "
        required
      />
    </>
  );
};

export default FormRow;
