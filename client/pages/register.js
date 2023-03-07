import {useMutation} from '@tanstack/react-query';
import {useState} from 'react';
import {FormRow, Loading} from '../components';
import {registerUserData} from '../utils/axios';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Register = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
  });

  //  react-query
  const {isLoading, isError, error, mutate} = useMutation({
    mutationFn: (newUser) => registerUserData(newUser),
    mutationKey: 'registerUser',
    onSuccess: () => {
      router.push('/login');
    },
  });

  //  onChange
  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const {name, email, password} = values;
    const registerNewUser = {name, email, password};
    mutate(registerNewUser);
    setValues({name: '', email: '', password: ''});
  };

  //  loading
  if (isLoading) return <Loading />;

  return (
    <div className="grid justify-center">
      {isError && <h3 className="text-rose-600 my-3 text-center">{error.response.data.msg}</h3>}

      <h2 className="text-center text-white text-4xl mb-10 mt-10">Register</h2>

      <form onSubmit={onSubmit}>
        {/*  forms */}
        <FormRow type="name" name="name" value={values.name} onChange={onChange} />
        <FormRow type="email" name="email" value={values.email} onChange={onChange} />
        <FormRow type="password" name="password" value={values.password} onChange={onChange} />

        {/*  submit button */}
        <button
          type="register"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-5 "
        >
          register
        </button>

        {/* link login button */}
        <p className="text-white py-3 my-3">
          Already a have an account?
          <Link
            className="py-2.5 px-5 mx-3  mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            href="/login"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
