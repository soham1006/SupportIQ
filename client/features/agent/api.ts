import { api } from '@/lib/api';

import {
  CreateAgentInput,
  UpdateAgentInput,
} from './agent.types';

export async function getAgents() {
  const response =
    await api.get('/agents');

  return response.data;
}

export async function getAgent(
  id: string,
) {
  const response =
    await api.get(`/agents/${id}`);

  return response.data;
}

export async function createAgent(
  data: CreateAgentInput,
) {
  const response =
    await api.post(
      '/agents',
      data,
    );

  return response.data;
}

export async function updateAgent(
  id: string,
  data: UpdateAgentInput,
) {
  const response =
    await api.patch(
      `/agents/${id}`,
      data,
    );

  return response.data;
}

export async function deleteAgent(
  id: string,
) {
  const response =
    await api.delete(
      `/agents/${id}`,
    );

  return response.data;
}