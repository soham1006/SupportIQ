'use client';

import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

export interface AgentDashboardStats {
  assigned: number;
  open: number;
  inProgress: number;
  resolved: number;
}

interface AgentDashboardStatsResponse {
  success: boolean;
  data: AgentDashboardStats;
}

async function getAgentDashboardStats() {
  const response =
    await api.get<AgentDashboardStatsResponse>(
      '/dashboard/agent/stats',
    );

  return response.data.data;
}

export function useAgentDashboardStats() {
  return useQuery({
    queryKey: [
      'agent-dashboard-stats',
    ],

    queryFn:
      getAgentDashboardStats,
  });
}