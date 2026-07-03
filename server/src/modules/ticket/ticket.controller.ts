import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { ticketService } from './ticket.service';
import {CreateReplyInput, UpdateTicketStatusInput, AssignTicketInput,} from './ticket.validation';

export class TicketController {
  async getAll(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      const tickets =
        await ticketService.getAll(
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: tickets,
      });
    } catch (error) {
      next(error);
    }
  }
  async getById(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const ticketId = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

const ticket = await ticketService.getById(
  ticketId,
  req.user,
);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}
async createReply(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const ticketId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { message } =
      req.body as CreateReplyInput;

    const reply =
      await ticketService.createReply(
        ticketId,
        req.user.id,
        message,
      );

    res.status(201).json({
      success: true,
      data: reply,
    });
  } catch (error) {
    next(error);
  }
}

async generateAIReply(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const ticketId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const draft =
      await ticketService.generateAIReply(
        ticketId,
        req.user.organizationId,
      );

    res.json({
      success: true,
      data: {
        draft,
      },
    });
  } catch (error) {
    next(error);
  }
}

async updateStatus(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const ticketId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { status } =
      req.body as UpdateTicketStatusInput;

    const ticket =
      await ticketService.updateStatus(
        ticketId,
        req.user.organizationId,
        status,
      );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

async getMyTickets(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const tickets =
      await ticketService.getMyTickets(
        req.user.id,
        req.user.organizationId,
      );

    res.json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
}

async assignTicket(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const ticketId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { agentId } =
      req.body as AssignTicketInput;

    const ticket =
      await ticketService.assignTicket(
        ticketId,
        req.user.organizationId,
        agentId,
      );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}
}

export const ticketController =
  new TicketController();