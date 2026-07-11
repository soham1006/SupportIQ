import { useQuery } from '@tanstack/react-query';

import { getTicket } from './api';

export function useTicket(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      'ticket',
      ticketId,
    ],

    queryFn: () =>
      getTicket(ticketId),

    enabled: !!ticketId,
  });
}