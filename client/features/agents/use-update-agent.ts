import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateAgent } from './api';

export function useUpdateAgent() {
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
        skills?: string[];
        isActive?: boolean;
      };
    }) =>
      updateAgent(
        id,
        data,
      ),

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries({
        queryKey: ['agents'],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'agent',
          variables.id,
        ],
      });
    },
  });
}