import {useMutation} from "@tanstack/react-query";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../../components";
import {updatePasswordData} from "../../utils/axios/authAxios";

import Login from "../login";
// ---------------------------------------------

const password = () => {
  //  user가 없을 경우 login 페이지로 돌리기
  const {data: session} = useSession();
  if (!session) return <Login />;

  // router로 passwordToken 설정
  const {
    query: {passwordToken},
  } = useRouter();

  // state
  const [values, setValues] = useState({
    email: "",
    newPassword: "",
  });

  //  onChange
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  //  onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const {email, newPassword} = values;
    mutate({passwordToken, email, newPassword});
  };

  //  react-query updatePassword
  const {mutate, data} = useMutation({
    mutationFn: ({passwordToken, email, newPassword}) => updatePasswordData({passwordToken, email, newPassword}),
    mutationKey: ["updatePassword"],
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: () => signOut(),
  });

  // return redering
  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">Reset Password</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow name="email" type="email" value={values.email} onChange={onChange} />

        <FormRow name="newPassword" type="password" value={values.newPassword} onChange={onChange} />

        {/*   button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          update password
        </button>
      </form>
    </div>
  );
};

export default password;
