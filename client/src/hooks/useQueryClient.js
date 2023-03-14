import {useQueryClient} from '@tanstack/react-query';

export const useGetFetchQuery = (queryKey) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(queryKey);
};
