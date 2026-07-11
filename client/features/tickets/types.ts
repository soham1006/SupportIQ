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

export interface TicketReply {
  id: string;
  message: string;
  createdAt: string;

  user: {
    id: string;
    name: string;
    role:
      | 'ADMIN'
      | 'AGENT'
      | 'CUSTOMER';
  };
}

export interface TicketDetails
  extends Ticket {
  description: string;

  assignedAgent?: Agent | null;

  replies: TicketReply[];

  updatedAt?: string;
}

export interface GetTicketsResponse {
  success: boolean;
  data: Ticket[];
}

export interface GetTicketResponse {
  success: boolean;
  data: TicketDetails;
}