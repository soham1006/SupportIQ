import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { markAllAsRead } from './api';

export function useMarkAllRead() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,

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