import { ticketRepository } from './ticket.repository';
import { agentReplyService } from '../ai/agent-reply.service';
import { ApiError } from '../../utils/ApiError';
import { TicketStatus } from '@prisma/client';
import { UserRole } from '@prisma/client';
import { ticketAuthorization } from './ticket.authorization';

export class TicketService {
  async getAll(organizationId: string) {
    return ticketRepository.findAll(
      organizationId,
    );
  }
 async getById(
  ticketId: string,
  user: {
    id: string;
    role: UserRole;
    organizationId: string;
  },
) {
  return ticketAuthorization.canAccess(
    ticketId,
    user,
  );
}
async createReply(
  ticketId: string,
  userId: string,
  message: string,
) {
  return ticketRepository.createReply({
    ticketId,
    userId,
    message,
  });
}

async generateAIReply(
  ticketId: string,
  organizationId: string,
) {
  const ticket =
    await ticketRepository.getTicketForAI(
      ticketId,
      organizationId,
    );

  if (!ticket) {
    throw new Error('Ticket not found');
  }

  const history =
    ticket.replies.map(
      reply =>
        `${reply.user.name}: ${reply.message}`,
    );

  return agentReplyService.generate(
    ticket.description,
    history,
  );
}

async updateStatus(
  ticketId: string,
  organizationId: string,
  status: TicketStatus,
) {
  const result =
    await ticketRepository.updateStatus(
      ticketId,
      organizationId,
      status,
    );

  if (result.count === 0) {
    throw new ApiError(
      404,
      'Ticket not found',
    );
  }

  return ticketRepository.findById(
    ticketId,
    organizationId,
  );
}
async getMyTickets(
  customerId: string,
  organizationId: string,
) {
  return ticketRepository.findMyTickets(
    customerId,
    organizationId,
  );
}


async assignTicket(
  ticketId: string,
  organizationId: string,
  agentId: string,
) {
  const result =
    await ticketRepository.assignTicket(
      ticketId,
      organizationId,
      agentId,
    );

  if (result.count === 0) {
    throw new ApiError(
      404,
      'Ticket not found',
    );
  }

  return ticketRepository.findById(
    ticketId,
    organizationId,
  );
}
}

export const ticketService =
  new TicketService();