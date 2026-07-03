import { api } from '@/lib/api';

export async function getTickets() {
  const response = await api.get('/tickets');

  return response.data;
}