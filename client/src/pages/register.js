import {useMutation} from "@tanstack/react-query";
import Link from "next/link";
import {useRouter} from "next/router";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {FormRow} from "../components";
import {registerUserData} from "../utils/axios/authAxios";

// ------------------------------------------------------

const Register = () => {
  //  router
  const router = useRouter();

  //  state 설정
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
  });

  //  react-query register요청
  const {mutate} = useMutation({
    mutationFn: (newUser) => registerUserData(newUser),
    mutationKey: ["registerUser"],
    onError: (error) => toast.error(error?.response?.data?.msg),
    onSuccess: () => router.push("/login"),
  });

  //  onChange
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  //  onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = values;
    const registerNewUser = {name, email, password};
    mutate(registerNewUser);
  };

  //  return rendering
  return (
    <div className=" bg-gray-900 h-screen pt-10 mt-20">
      {/*  title */}
      <h2 className="text-center text-white text-4xl">Register</h2>

      {/*  form */}
      <form className="mt-10 grid justify-center" onSubmit={onSubmit}>
        <FormRow name="email" type="email" value={values.email} onChange={onChange} />
        <FormRow name="name" type="name" value={values.name} onChange={onChange} />
        <FormRow name="password" type="password" value={values.password} onChange={onChange} />

        {/*  login button */}
        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          Register
        </button>

        {/*  register 조건 */}
        <div className="my-10">
          <p className="text-white py-3">
            Already have user?
            <Link
              className="py-2.5 px-5 mx-3  mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
