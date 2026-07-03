import {api} from '@/lib/api';
import { Ticket } from './types';

interface GetTicketResponse {
  success: boolean;
  data: Ticket;
}

export async function getTicket(
  id: string,
) {
  const { data } =
    await api.get<GetTicketResponse>(
      `/tickets/${id}`,
    );

  return data;
}