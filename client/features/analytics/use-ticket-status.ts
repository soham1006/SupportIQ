import { useQuery } from '@tanstack/react-query';

import { getTicketStatus } from './api';

export function useTicketStatus() {
  return useQuery({
    queryKey: [
      'analytics',
      'ticket-status',
    ],

    queryFn:
      getTicketStatus,
  });
}