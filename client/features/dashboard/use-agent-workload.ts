import { useQuery } from '@tanstack/react-query';

import { getAgentWorkload } from './api';

export function useAgentWorkload() {
  return useQuery({
    queryKey: [
      'dashboard',
      'agents',
    ],

    queryFn:
      getAgentWorkload,
  });
}