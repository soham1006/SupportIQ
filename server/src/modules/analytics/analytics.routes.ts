import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';
import { analyticsController } from './analytics.controller';

const router = Router();

router.get(
  '/overview',
  authenticate,
  analyticsController.getOverview.bind(
    analyticsController,
  ),
);

router.get(
  '/ticket-status',
  authenticate,
  analyticsController.getTicketStatus.bind(
    analyticsController,
  ),
);

router.get(
  '/ticket-trend',
  authenticate,
  analyticsController.getTicketTrend.bind(
    analyticsController,
  ),
);

router.get(
  '/top-agents',
  authenticate,
  analyticsController.getTopAgents.bind(
    analyticsController,
  ),
);

export default router;