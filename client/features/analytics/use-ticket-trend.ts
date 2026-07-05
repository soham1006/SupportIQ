import { useQuery } from '@tanstack/react-query';

import { getTicketTrend } from './api';

export function useTicketTrend() {
  return useQuery({
    queryKey: [
      'analytics',
      'ticket-trend',
    ],

    queryFn:
      getTicketTrend,
  });
}