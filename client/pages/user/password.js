import {QueryCache, useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {Form, Loading} from '../../components';

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

const query = queryCache.find({queryKey: ['forgotPassword']});

const password = () => {
  console.log(query, 'query');
  const fetchData = async () => {
    const {data} = await axios.patch('/api/v1/auth/user/password', {
      passwordToken: 'b649bedb5cc23b59adc021762a9fe61dce5d5c0aa1480f346d90e64cb512767c8befb91f3ebc4a4b0357ffc502227a84473d408b9ea782812fd71ecbdfe3338c',
      email: 'cooper@gmail.com',
      newPassword: 'newSecret',
    });
    return data;
  };

  const {isInitialLoading, isError, data, error, refetch, isFetching} = useQuery({
    queryKey: ['updatePassword'],
    queryFn: fetchData,
    onError: (error) => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (isInitialLoading) return <Loading />;
  if (isFetching) return <h2 className="text-white">fetching...</h2>;
  console.log(data, 'data');
  return (
    <div className="grid justify-center">
      <h2 className="text-center text-white text-4xl mb-10 mt-10">New Password</h2>
      <Form type="login" field="Your Email" />
      <Form type="login" field="New Password" />
      {error && <h2 className="text-white">{error.response.data.msg}</h2>}
      <button
        type="login"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-10 "
        onClick={() => refetch()}
      >
        Update Password
      </button>
      {data && <h2 className="text-white">{data.msg}</h2>}
    </div>
  );
};

export default password;
