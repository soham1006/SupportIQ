import { Router } from 'express';

import {
  authenticate,
  authorize,
} from '../auth/auth.middleware';

import { UserRole } from '@prisma/client';

import { validate } from '../../shared/middleware/validate';

import {
  createAgentSchema,
  updateAgentSchema,
} from './agent.validation';

import { agentController } from './agent.controller';

const router = Router();

router.use(
  authenticate,
  authorize(UserRole.ADMIN),
);

router.get(
  '/',
  agentController.getAll.bind(
    agentController,
  ),
);

router.get(
  '/:id',
  agentController.getById.bind(
    agentController,
  ),
);

router.post(
  '/',
  validate(createAgentSchema),
  agentController.create.bind(
    agentController,
  ),
);

router.patch(
  '/:id',
  validate(updateAgentSchema),
  agentController.update.bind(
    agentController,
  ),
);

router.delete(
  '/:id',
  agentController.delete.bind(
    agentController,
  ),
);

export default router;