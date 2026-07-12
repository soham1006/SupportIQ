'use client';

import {
  useQuery,
} from '@tanstack/react-query';

import {
  getPublicWorkspace,
} from './api';

export function useWorkspace(
  slug: string,
) {
  return useQuery({
    queryKey: [
      'public-workspace',
      slug,
    ],

    queryFn: () =>
      getPublicWorkspace(
        slug,
      ),

    enabled:
      Boolean(slug),

    retry: false,
  });
}