import { Router } from 'express';
import { UserRole } from '@prisma/client';

import {
  authenticate,
  authorize,
} from '../auth/auth.middleware';

import { dashboardController } from './dashboard.controller';

const router = Router();

/* All dashboard routes require authentication */

router.use(authenticate);

/* ---------------- Admin Dashboard ---------------- */

router.get(
  '/stats',
  authorize(UserRole.ADMIN),
  dashboardController.getStats.bind(
    dashboardController,
  ),
);

router.get(
  '/agents',
  authorize(UserRole.ADMIN),
  dashboardController.getAgentWorkload.bind(
    dashboardController,
  ),
);

router.get(
  '/recent-tickets',
  authorize(UserRole.ADMIN),
  dashboardController.getRecentTickets.bind(
    dashboardController,
  ),
);

/* ---------------- Agent Dashboard ---------------- */

router.get(
  '/agent/stats',
  authorize(UserRole.AGENT),
  dashboardController.getAgentStats.bind(
    dashboardController,
  ),
);

export default router;