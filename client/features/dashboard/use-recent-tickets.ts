import { useQuery } from '@tanstack/react-query';

import { getRecentTickets } from './api';

export function useRecentTickets() {
  return useQuery({
    queryKey: [
      'dashboard',
      'recent-tickets',
    ],

    queryFn:
      getRecentTickets,
  });
}