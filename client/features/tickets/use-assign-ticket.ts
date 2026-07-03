import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { assignTicket } from './api';

export function useAssignTicket() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      ticketId,
      agentId,
    }: {
      ticketId: string;
      agentId: string;
    }) =>
      assignTicket(
        ticketId,
        agentId,
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