import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { createReply } from './api';

export function useCreateReply() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      message,
    }: {
      ticketId: string;
      message: string;
    }) =>
      createReply(ticketId, message),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          'ticket',
          variables.ticketId,
        ],
      });
    },
  });
}