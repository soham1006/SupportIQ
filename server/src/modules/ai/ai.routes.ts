import { Router } from 'express';
import { validate } from '../../shared/middleware/validate';
import { chatController } from './chat.controller';
import { chatSchema } from './chat.validation';
import { authenticate } from '../auth/auth.middleware';
import { chatStreamController } from '../chat/chat.stream.controller';

const router = Router();

router.post(
  '/chat',
  authenticate,
  validate(chatSchema),
  chatController.chat.bind(chatController),
);

router.post(
  '/chat/stream',
  authenticate,
  chatStreamController.stream.bind(
    chatStreamController,
  ),
);

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'AI module ready',
  });
});

export default router;