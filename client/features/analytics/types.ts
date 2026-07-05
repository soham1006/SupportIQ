export interface AnalyticsOverview {
  totalTickets: number;

  openTickets: number;

  inProgressTickets: number;

  resolvedTickets: number;

  closedTickets: number;

  totalAgents: number;

  totalDocuments: number;

  resolutionRate: number;

  averageAIConfidence: string;
}

export interface AnalyticsOverviewResponse {
  success: boolean;

  data: AnalyticsOverview;
}

export interface TicketStatus {
  status:
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'CLOSED';

  count: number;
}

export interface TicketStatusResponse {
  success: boolean;

  data: TicketStatus[];
}

export interface TicketTrend {
  date: string;

  count: number;
}

export interface TicketTrendResponse {
  success: boolean;

  data: TicketTrend[];
}

export interface TopAgent {
  id: string;

  name: string;

  email: string;

  resolved: number;
}

export interface TopAgentsResponse {
  success: boolean;

  data: TopAgent[];
}