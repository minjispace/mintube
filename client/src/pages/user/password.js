import {QueryCache, useQuery} from "@tanstack/react-query";
import {signOut} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../../components";
import {updatePasswordData} from "../../utils/axios";

const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
  onSettled: (data, error) => {
    console.log(data, error);
  },
});

const query = queryCache.find({queryKey: ["forgotPassword"]});

const password = () => {
  const {
    query: {passwordToken},
  } = useRouter();

  const [values, setValues] = useState({
    email: "",
    newPassword: "",
  });

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {email, newPassword} = values;
    mutate({passwordToken, email, newPassword});
  };

  const {mutate} = useMutation({
    mutationFn: (newUser) => updatePasswordData(newUser),
    mutationKey: ["updatePassword"],
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: (data) => console.log(data, "data"),
  });

  const {data, refetch} = useQuery({
    queryKey: ["updatePassword"],
    queryFn: () => {
      const {email, newPassword} = values;
      updatePasswordData({passwordToken, email, newPassword});
    },
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: (data) => console.log(data, "data"),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">Reset Password</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow name="email" type="your email" value={values.email} onChange={onChange} />

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
