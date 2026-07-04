import {api} from '@/lib/api';

/* ---------------- Create Ticket ---------------- */

export async function createTicket(data: {
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}) {
  const response = await api.post(
    '/tickets',
    data,
  );

  return response.data;
}

/* ---------------- Tickets ---------------- */

export async function getTickets() {
  const { data } = await api.get('/tickets');
  return data;
}

export async function getTicket(
  ticketId: string,
) {
  const { data } = await api.get(
    `/tickets/${ticketId}`,
  );

  return data;
}

/* ---------------- Replies ---------------- */

export async function createReply(
  ticketId: string,
  message: string,
) {
  const { data } = await api.post(
    `/tickets/${ticketId}/replies`,
    {
      message,
    },
  );

  return data;
}

export async function generateAIReply(
  ticketId: string,
) {
  const { data } = await api.post(
    `/tickets/${ticketId}/ai-reply`,
  );

  return data;
}

/* ---------------- Assign ---------------- */

export async function assignTicket(
  ticketId: string,
  agentId: string,
) {
  const { data } = await api.patch(
    `/tickets/${ticketId}/assign`,
    {
      agentId,
    },
  );

  return data;
}

/* ---------------- Status ---------------- */

export async function updateTicketStatus(
  ticketId: string,
  status: string,
) {
  const { data } = await api.patch(
    `/tickets/${ticketId}/status`,
    {
      status,
    },
  );

  return data;
}