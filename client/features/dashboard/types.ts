export interface DashboardStats {
  totalTickets: number;

  openTickets: number;

  inProgressTickets: number;

  resolvedTickets: number;

  closedTickets: number;

  totalAgents: number;

  totalDocuments: number;

  indexedDocuments: number;

  processingDocuments: number;
}

export interface DashboardStatsResponse {
  success: boolean;

  data: DashboardStats;
}

export interface AgentWorkload {
  id: string;

  name: string;

  email: string;

  totalTickets: number;

  open: number;

  inProgress: number;

  resolved: number;
}

export interface AgentWorkloadResponse {
  success: boolean;

  data: AgentWorkload[];
}