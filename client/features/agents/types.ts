export interface Agent {
  id: string;
  name: string;
  email: string;

  role: string;

  status:
    | 'ONLINE'
    | 'OFFLINE'
    | 'BUSY';

  activeTickets: number;

  resolvedTickets: number;

  satisfaction: number;
}

export interface GetAgentsResponse {
  success: boolean;
  data: Agent[];
}