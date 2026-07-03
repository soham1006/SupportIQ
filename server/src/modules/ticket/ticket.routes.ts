import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';

import { ticketController } from './ticket.controller';

import { validate } from '../../shared/middleware/validate';
import { assignTicketSchema, createReplySchema, updateTicketStatusSchema } from './ticket.validation';

const router = Router();

router.get(
  '/',
  authenticate,
  ticketController.getAll.bind(
    ticketController,
  ),
);

router.get(
  '/:id',
  authenticate,
  ticketController.getById.bind(
    ticketController,
  ),
);

router.post(
  '/:id/replies',
  authenticate,
  validate(createReplySchema),
  ticketController.createReply.bind(
    ticketController,
  ),
);

router.post(
  '/:id/ai-reply',
  authenticate,
  ticketController.generateAIReply.bind(
    ticketController,
  ),
);

router.patch(
  '/:id/status',
  authenticate,
  validate(updateTicketStatusSchema),
  ticketController.updateStatus.bind(
    ticketController,
  ),
);

router.get(
  '/my',
  authenticate,
  ticketController.getMyTickets.bind(
    ticketController,
  ),
);

router.patch(
  '/:id/assign',
  authenticate,
  validate(assignTicketSchema),
  ticketController.assignTicket.bind(
    ticketController,
  ),
);

export default router;