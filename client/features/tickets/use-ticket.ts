import { useQuery } from '@tanstack/react-query';

import {api} from '@/lib/api';

export function useTicket(
  id: string,
) {
  return useQuery({
    queryKey: ['ticket', id],

    queryFn: async () => {
      const { data } =
        await api.get(`/tickets/${id}`);

      return data;
    },

    enabled: !!id,
  });
}