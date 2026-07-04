import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';
import { documentController } from './document.controller';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  documentController.getAll,
);

router.get(
  '/:id',
  documentController.getById,
);

router.delete(
  '/:id',
  documentController.delete,
);

export default router;