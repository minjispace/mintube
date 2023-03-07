import {useQuery} from '@tanstack/react-query';
import {FormRow} from '../components';
import Link from 'next/link';
import {loginUserData} from '../utils/axios';
import {useState} from 'react';
import {useRouter} from 'next/router';

const login = () => {
  //  router
  const router = useRouter();

  //  state
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //  react-query
  const {isError, error, refetch} = useQuery({
    queryKey: ['loginUser'],
    queryFn: () => loginUserData({email: values.email, password: values.password}),
    enabled: false,
    onSuccess: () => {
      router.push('/');
      setValues({email: '', password: ''});
    },
  });

  //  on change function
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  //  on submit function
  const onSubmit = (e) => {
    e.preventDefault();
    const {email, password} = values;
    const loginUser = {email, password};
    setValues(loginUser);
    refetch();
  };

  //  rendering
  return (
    <div className="grid justify-center">
      {/*  error */}
      {isError && <h2 className="text-rose-600 my-3">{error.response.data.msg}</h2>}

      {/*  title */}
      <h2 className="text-center text-white text-4xl mb-10 mt-10">Login</h2>

      {/*  form */}
      <form onSubmit={onSubmit}>
        <FormRow name="email" type="email" field="email" onChange={onChange} />
        <FormRow name="password" type="password" field="password" onChange={onChange} />

        {/*  login button */}
        <button
          type="login"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          login
        </button>

        {/*  link button */}
        <div className="my-5">
          <p className="text-white py-3">
            Don't have an account?
            <Link
              className="py-2.5 px-5 mx-3  mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              href="/register"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default login;
