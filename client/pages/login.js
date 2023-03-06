import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {Form, Loading} from '../components';

const login = () => {
  const fetchData = async () => {
    const {data} = await axios.post('/api/v1/auth/login', {
      email: 'minji@gmail.com',
      password: 'secret',
    });
    return data;
  };

  const {isInitialLoading, isError, data, error, refetch, isFetching} = useQuery({
    queryKey: ['registerUser'],
    queryFn: fetchData,
    onError: (error) => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (isInitialLoading) return <Loading />;
  if (isFetching) return <h2 className="text-white">fetching...</h2>;
  if (data) return console.log(data.user);

  return (
    <div className="grid justify-center">
      <h2 className="text-center text-white text-4xl mb-10 mt-10">Login</h2>
      <Form type="login" field="email" />
      <Form type="login" field="password" />
      {error && <h2 className="text-white">{error.response.data.msg}</h2>}
      <button
        type="login"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-10 "
        onClick={() => refetch()}
      >
        login
      </button>
    </div>
  );
};

export default login;
