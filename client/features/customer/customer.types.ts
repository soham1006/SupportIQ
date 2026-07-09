export interface Customer {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;

  _count?: {
    customerTickets: number;
  };
}

export interface CreateCustomerInput {
  name: string;
  email: string;
  password: string;
}

export interface UpdateCustomerInput {
  name?: string;
  isActive?: boolean;
}