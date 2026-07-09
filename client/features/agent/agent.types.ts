export interface Agent {
  id: string;
  name: string;
  email: string;
  skills: string[];
  isActive: boolean;
  createdAt: string;

  _count?: {
    assignedTickets: number;
  };
}

export interface CreateAgentInput {
  name: string;
  email: string;
  password: string;
  skills: string[];
}

export interface UpdateAgentInput {
  name?: string;
  skills?: string[];
  isActive?: boolean;
}