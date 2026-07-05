import { useQuery } from '@tanstack/react-query';

import { getAgent } from './api';

export function useAgent(
  id: string,
) {
  return useQuery({
    queryKey: [
      'agent',
      id,
    ],

    queryFn: () =>
      getAgent(id),

    enabled: !!id,
  });
}