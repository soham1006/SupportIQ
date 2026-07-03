import { UserRole } from '@prisma/client';
import { ticketRepository } from './ticket.repository';
import { ApiError } from '../../utils/ApiError';

export class TicketAuthorization {
  async canAccess(
    ticketId: string,
    user: {
      id: string;
      role: UserRole;
      organizationId: string;
    },
  ) {
    const ticket = await ticketRepository.findById(
      ticketId,
      user.organizationId,
    );

    if (!ticket) {
      throw new ApiError(404, 'Ticket not found');
    }

    if (user.role === UserRole.ADMIN) {
      return ticket;
    }

    if (
      user.role === UserRole.AGENT &&
      ticket.assignedAgentId === user.id
    ) {
      return ticket;
    }

    if (
      user.role === UserRole.CUSTOMER &&
      ticket.customerId === user.id
    ) {
      return ticket;
    }

    throw new ApiError(
      403,
      'You are not authorized to access this ticket',
    );
  }
}

export const ticketAuthorization =
  new TicketAuthorization();