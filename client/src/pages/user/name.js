import {useQuery} from "@tanstack/react-query";
import {signOut, useSession} from "next-auth/react";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../../components";
import {updateUserNameData} from "../../utils/axios/authAxios";

import Login from "../login";
// ---------------------------------------------------------

const name = () => {
  //  유저가 없을 경우 login page로 redirect
  const {data: session} = useSession();
  console.log(session, "session");
  if (!session) return <Login />;

  // state
  const [value, setValue] = useState("");

  // onChange
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  //  reaqct-query updateUserName 요청
  const {refetch} = useQuery({
    queryKey: ["updateName"],
    queryFn: () => updateUserNameData(value),
    onError: (error) => toast.error(error.response.data.msg),
    onSuccess: () => signOut(),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  //  return rendering
  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">update name</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow status="updateName" name="name" type="name" value={value} onChange={onChange} />

        {/*  update button */}
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
