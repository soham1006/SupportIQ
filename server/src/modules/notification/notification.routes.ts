import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';
import { notificationController } from './notification.controller';

const router = Router();

router.get(
  '/',
  authenticate,
  notificationController.getAll.bind(
    notificationController,
  ),
);

router.get(
  '/unread-count',
  authenticate,
  notificationController.getUnreadCount.bind(
    notificationController,
  ),
);

router.patch(
  '/read-all',
  authenticate,
  notificationController.markAllAsRead.bind(
    notificationController,
  ),
);

router.patch(
  '/:id/read',
  authenticate,
  notificationController.markAsRead.bind(
    notificationController,
  ),
);

export default router;