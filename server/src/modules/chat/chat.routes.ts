import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';

import { chatController } from './chat.controller';

const router = Router();

router.post(
  '/',
  authenticate,
  chatController.ask.bind(
    chatController,
  ),
);

router.get(
  '/conversations',
  authenticate,
  chatController.getConversations.bind(
    chatController,
  ),
);

router.get(
  '/:id/messages',
  authenticate,
  chatController.getMessages.bind(
    chatController,
  ),
);

export default router;