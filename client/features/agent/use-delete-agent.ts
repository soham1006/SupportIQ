import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { deleteAgent } from './api';

export function useDeleteAgent() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteAgent,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['agents'],
      });
    },
  });
}