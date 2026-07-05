import { useQuery } from '@tanstack/react-query';

import { getUnreadCount } from './api';

export function useUnreadCount() {
  return useQuery({
    queryKey: [
      'notifications',
      'count',
    ],

    queryFn:
      getUnreadCount,

    refetchInterval: 30000,

    refetchOnWindowFocus: true,
  });
}