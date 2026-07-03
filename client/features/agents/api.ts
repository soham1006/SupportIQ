import {api} from '@/lib/api';

import { GetAgentsResponse } from './types';

export async function getAgents() {
  const { data } =
    await api.get<GetAgentsResponse>(
      '/agents',
    );

  return data;
}