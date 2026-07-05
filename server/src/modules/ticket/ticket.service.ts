import {
  TicketPriority,
  TicketStatus,
  UserRole,
  NotificationType,
} from '@prisma/client';

import { ticketRepository } from './ticket.repository';
import { ticketAuthorization } from './ticket.authorization';

import { agentReplyService } from '../ai/agent-reply.service';
import { notificationService } from '../notification/notification.service';

import { ApiError } from '../../utils/ApiError';

export class TicketService {
  async getAll(
    organizationId: string,
  ) {
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

  async create(
    data: {
      organizationId: string;
      customerId: string;
      subject: string;
      description: string;
      priority: TicketPriority;
    },
  ) {
    const ticket =
      await ticketRepository.create({
        organizationId:
          data.organizationId,

        customerId:
          data.customerId,

        subject: data.subject,

        description:
          data.description,

        priority: data.priority,

        aiConfidence: 0,
      });

    const admins =
      await notificationService.findAdmins(
        data.organizationId,
      );

    await Promise.all(
      admins.map(admin =>
        notificationService.create({
          userId: admin.id,

          title: 'New Ticket',

          message: `Ticket "${ticket.subject}" has been created.`,

          type:
            NotificationType.NEW_TICKET,
        }),
      ),
    );

    return ticket;
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
      throw new Error(
        'Ticket not found',
      );
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

    const ticket =
      await ticketRepository.findById(
        ticketId,
        organizationId,
      );

    if (!ticket) {
      throw new ApiError(
        404,
        'Ticket not found',
      );
    }

    if (
      status ===
      TicketStatus.RESOLVED
    ) {
      await notificationService.create({
        userId:
          ticket.customerId,

        title:
          'Ticket Resolved',

        message: `Your ticket "${ticket.subject}" has been resolved.`,

        type:
          NotificationType.TICKET_RESOLVED,
      });
    }

    return ticket;
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

    const ticket =
      await ticketRepository.findById(
        ticketId,
        organizationId,
      );

    if (!ticket) {
      throw new ApiError(
        404,
        'Ticket not found',
      );
    }

    await notificationService.create({
      userId: agentId,

      title:
        'New Ticket Assigned',

      message: `Ticket "${ticket.subject}" has been assigned to you.`,

      type:
        NotificationType.TICKET_ASSIGNED,
    });

    return ticket;
  }
}

export const ticketService =
  new TicketService();