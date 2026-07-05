import { api } from '@/lib/api';

import { AnalyticsOverviewResponse } from './types';


import { TicketStatusResponse } from './types';

import { TicketTrendResponse } from './types';

import { TopAgentsResponse } from './types';

export async function getTopAgents() {
  const { data } =
    await api.get<TopAgentsResponse>(
      '/analytics/top-agents',
    );

  return data;
}

export async function getTicketTrend() {
  const { data } =
    await api.get<TicketTrendResponse>(
      '/analytics/ticket-trend',
    );

  return data;
}

export async function getTicketStatus() {
  const { data } =
    await api.get<TicketStatusResponse>(
      '/analytics/ticket-status',
    );

  return data;
}

export async function getOverview() {
  const { data } =
    await api.get<AnalyticsOverviewResponse>(
      '/analytics/overview',
    );

  return data;
}