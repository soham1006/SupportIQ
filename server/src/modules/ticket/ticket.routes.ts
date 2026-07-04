import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';

import { ticketController } from './ticket.controller';

import { validate } from '../../shared/middleware/validate';

import {
  createTicketSchema,
  assignTicketSchema,
  createReplySchema,
  updateTicketStatusSchema,
} from './ticket.validation';

const router = Router();

/* ---------------- Create Ticket ---------------- */

router.post(
  '/',
  authenticate,
  validate(createTicketSchema),
  ticketController.create.bind(
    ticketController,
  ),
);

/* ---------------- Get All ---------------- */

router.get(
  '/',
  authenticate,
  ticketController.getAll.bind(
    ticketController,
  ),
);

/* ---------------- My Tickets ---------------- */

router.get(
  '/my',
  authenticate,
  ticketController.getMyTickets.bind(
    ticketController,
  ),
);

/* ---------------- Get By Id ---------------- */

router.get(
  '/:id',
  authenticate,
  ticketController.getById.bind(
    ticketController,
  ),
);

/* ---------------- Reply ---------------- */

router.post(
  '/:id/replies',
  authenticate,
  validate(createReplySchema),
  ticketController.createReply.bind(
    ticketController,
  ),
);

/* ---------------- AI Reply ---------------- */

router.post(
  '/:id/ai-reply',
  authenticate,
  ticketController.generateAIReply.bind(
    ticketController,
  ),
);

/* ---------------- Status ---------------- */

router.patch(
  '/:id/status',
  authenticate,
  validate(updateTicketStatusSchema),
  ticketController.updateStatus.bind(
    ticketController,
  ),
);

/* ---------------- Assign ---------------- */

router.patch(
  '/:id/assign',
  authenticate,
  validate(assignTicketSchema),
  ticketController.assignTicket.bind(
    ticketController,
  ),
);

export default router;