import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateCustomer } from './api';

export function useUpdateCustomer() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        name?: string;
        isActive?: boolean;
      };
    }) =>
      updateCustomer(
        id,
        data,
      ),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      });
    },
  });
}