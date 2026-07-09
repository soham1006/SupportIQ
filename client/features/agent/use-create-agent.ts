import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createAgent } from './api';

export function useCreateAgent() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: createAgent,

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['agents'],
      });
    },
  });
}