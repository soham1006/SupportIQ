import { useQuery } from '@tanstack/react-query';

import { getTopAgents } from './api';

export function useTopAgents() {
  return useQuery({
    queryKey: [
      'analytics',
      'top-agents',
    ],

    queryFn:
      getTopAgents,
  });
}