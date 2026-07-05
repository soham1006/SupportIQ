import { api } from '@/lib/api';

import { GetAgentsResponse } from './types';

/* ---------------- Get All ---------------- */

export async function getAgents() {
  const { data } =
    await api.get<GetAgentsResponse>(
      '/agents',
    );

  return data;
}

/* ---------------- Get One ---------------- */

export async function getAgent(
  id: string,
) {
  const { data } =
    await api.get(`/agents/${id}`);

  return data;
}

/* ---------------- Create ---------------- */

export async function createAgent(
  payload: {
    name: string;
    email: string;
    password: string;
    skills: string[];
  },
) {
  const { data } =
    await api.post(
      '/agents',
      payload,
    );

  return data;
}

/* ---------------- Update ---------------- */

export async function updateAgent(
  id: string,
  payload: {
    name?: string;
    skills?: string[];
    isActive?: boolean;
  },
) {
  const { data } =
    await api.patch(
      `/agents/${id}`,
      payload,
    );

  return data;
}

/* ---------------- Delete ---------------- */

export async function deleteAgent(
  id: string,
) {
  const { data } =
    await api.delete(
      `/agents/${id}`,
    );

  return data;
}