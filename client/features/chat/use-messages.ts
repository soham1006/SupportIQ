import { useQuery } from '@tanstack/react-query';

import { getMessages } from './api';

export function useMessages(
  conversationId?: string,
) {
  return useQuery({
    queryKey: [
      'chat',
      conversationId,
    ],

    queryFn: () =>
      getMessages(
        conversationId!,
      ),

    enabled:
      !!conversationId,
  });
}