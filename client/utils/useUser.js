import {useQuery} from '@tanstack/react-query';
import {redirect} from 'next/dist/server/api-utils';

const useUser = ({redirectTo = '', redirectIfFound = false}) => {
  //  react-query
  const {isError, error, refetch, data} = useQuery({
    queryKey: ['loginUser'],
    queryFn: () => loginUserData({email: values.email, password: values.password}),
    enabled: false,
    staleTime: 1000 * 60 * 60,

    onSuccess: (data) => {
      //   saveUser(data.data.user);
      router.push('/');
      //   setValues({email: '', password: ''});
    },
  });
};

export default useUser;
