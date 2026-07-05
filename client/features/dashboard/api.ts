import { api } from '@/lib/api';

import { DashboardStatsResponse } from './types';

export async function getDashboardStats() {
  const { data } =
    await api.get<DashboardStatsResponse>(
      '/dashboard/stats',
    );

  return data;
}

import {
  AgentWorkloadResponse,
} from './types';

export async function getAgentWorkload() {
  const { data } =
    await api.get<AgentWorkloadResponse>(
      '/dashboard/agents',
    );

  return data;
}

export async function getRecentTickets() {
  const { data } =
    await api.get(
      '/dashboard/recent-tickets',
    );

  return data;
}