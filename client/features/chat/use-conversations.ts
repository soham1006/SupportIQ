import { useQuery } from '@tanstack/react-query';

import { getConversations } from './api';

export function useConversations() {
  return useQuery({
    queryKey: ['chat', 'conversations'],

    queryFn:
      getConversations,
  });
}