export interface Agent {
  id: string;

  name: string;

  email: string;

  skills: string[];

  isActive: boolean;

  createdAt: string;

  _count: {
    assignedTickets: number;
  };
}

export interface GetAgentsResponse {
  success: boolean;

  data: Agent[];
}