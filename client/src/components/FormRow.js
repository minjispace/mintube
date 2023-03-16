import {useSession} from "next-auth/react";

const FormRow = ({status, type, name, value, onChange}) => {
  const {data: session} = useSession();
  return (
    <>
      <label htmlFor={name} className="mb-2 text-l font-medium text-white ">
        {type} :
      </label>
      <input
        type={type}
        value={value}
        placeholder={status === "updateName" ? session?.user?.name : null}
        name={name}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 tracking-wider my-2 "
        required
      />
    </>
  );
};

export default FormRow;
