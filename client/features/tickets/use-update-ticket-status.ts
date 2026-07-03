import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { updateTicketStatus } from './api';

export function useUpdateTicketStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      status,
    }: {
      ticketId: string;
      status: string;
    }) =>
      updateTicketStatus(
        ticketId,
        status,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          'ticket',
          variables.ticketId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      });
    },
  });
}