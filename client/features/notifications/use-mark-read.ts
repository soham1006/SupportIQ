import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { markAsRead } from './api';

export function useMarkRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: markAsRead,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            'notifications',
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            'notifications',
            'count',
          ],
        }),
      ]);
    },
  });
}