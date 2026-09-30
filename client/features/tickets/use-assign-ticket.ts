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

    onSuccess: (
      _,
      variables,
    ) => {
      // Refresh ticket details
      queryClient.invalidateQueries({
        queryKey: [
          'ticket',
          variables.ticketId,
        ],
      });

      // Refresh tickets list
      queryClient.invalidateQueries({
        queryKey: [
          'tickets',
        ],
      });

      // Refresh dashboard recent tickets
      queryClient.invalidateQueries({
        queryKey: [
          'dashboard',
          'recent-tickets',
        ],
      });

      // Refresh agent workload if assignment affects it
      queryClient.invalidateQueries({
        queryKey: [
          'dashboard',
          'agents',
        ],
      });
    },
  });
}