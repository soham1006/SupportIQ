export interface Customer {
  id: string;
  name: string;
  email: string;
}

export interface Agent {
  id: string;
  name: string;
}

export interface Ticket {
  id: string;
  subject: string;

  status:
    | 'OPEN'
    | 'IN_PROGRESS'
    | 'RESOLVED'
    | 'CLOSED';

  priority:
    | 'LOW'
    | 'MEDIUM'
    | 'HIGH';

  customer: Customer;

  agent?: Agent | null;

  createdAt: string;
}

export interface GetTicketsResponse {
  success: boolean;
  data: Ticket[];
}