import { Router } from 'express';
import { authenticate } from '../auth/auth.middleware';
import { dashboardController } from './dashboard.controller';

const router = Router();

router.get(
  '/stats',
  authenticate,
  dashboardController.getStats.bind(
    dashboardController,
  ),
);
router.get(
  '/agents',
  authenticate,
  dashboardController.getAgentWorkload.bind(
    dashboardController,
  ),
);

export default router;