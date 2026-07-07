import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { askAI } from './api';

export function useChat() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: askAI,

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [
          'chat',
          data.data
            .conversationId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          'conversations',
        ],
      });
    },
  });
}