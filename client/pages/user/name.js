import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import {Form, Loading} from '../../components';

const name = () => {
  const fetchData = async () => {
    const {data} = await axios.patch('/api/v1/auth/user/name', {
      name: 'newCooper',
    });
    return data;
  };

  const {isInitialLoading, isError, data, error, refetch, isFetching} = useQuery({
    queryKey: ['updateName'],
    queryFn: fetchData,
    onError: (error) => {
      console.log(error);
    },
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (isInitialLoading) return <Loading />;
  if (isFetching) return <h2 className="text-white">fetching...</h2>;

  return (
    <div className="grid justify-center">
      <h2 className="text-center text-white text-4xl mb-10 mt-10">New Name</h2>
      <Form type="login" field="New Name" />
      {error && <h2 className="text-white">{error.response.data.msg}</h2>}
      <button
        type="update name"
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  mt-10 "
        onClick={() => refetch()}
      >
        Update Name
      </button>
      {data && <h2 className="text-white">{data.user.name}</h2>}
    </div>
  );
};

export default name;
