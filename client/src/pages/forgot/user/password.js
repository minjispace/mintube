import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../../../components";
import {forgotPasswordData} from "../../../utils/axios";

const forgotPassword = () => {
  const [value, setValue] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const {data, refetch} = useQuery({
    queryKey: ["forgotPassword"],
    queryFn: () => forgotPasswordData(value),
    onError: (error) => toast.error(error.response.data.msg),
    onSuccess: (data) =>
      router.push({
        pathname: "/user/password",
        query: {passwordToken: data?.data?.passwordToken},
      }),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  console.log(data?.data?.passwordToken, "data");

  return (
    <div className=" bg-gray-900 h-screen pt-10">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">Forgot Password</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow name="originalPassword" type="password" value={value} onChange={onChange} />

        {/*  login button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default forgotPassword;
