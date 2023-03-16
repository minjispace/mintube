import {useQuery} from "@tanstack/react-query";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../../components";
import {updateUserNameData} from "../../utils/axios";
import {signOut} from "next-auth/react";

const name = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const {data, refetch} = useQuery({
    queryKey: ["updateName"],
    queryFn: () => updateUserNameData(value),
    onError: (error) => toast.error(error.response.data.msg),
    onSuccess: () => signOut(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">update name</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow status="updateName" name="name" type="name" value={value} onChange={onChange} />

        {/*  login button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          update name
        </button>
      </form>
    </div>
  );
};

export default name;
