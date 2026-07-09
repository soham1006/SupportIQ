import { Router } from 'express';

import {
  authenticate,
  authorize,
} from '../auth/auth.middleware';

import { UserRole } from '@prisma/client';

import { validate } from '../../shared/middleware/validate';

import {
  createCustomerSchema,
  updateCustomerSchema,
} from './customer.validation';

import { customerController } from './customer.controller';

const router = Router();

router.use(
  authenticate,
  authorize(UserRole.ADMIN),
);

router.get(
  '/',
  customerController.getAll.bind(
    customerController,
  ),
);

router.get(
  '/:id',
  customerController.getById.bind(
    customerController,
  ),
);

router.post(
  '/',
  validate(createCustomerSchema),
  customerController.create.bind(
    customerController,
  ),
);

router.patch(
  '/:id',
  validate(updateCustomerSchema),
  customerController.update.bind(
    customerController,
  ),
);

router.delete(
  '/:id',
  customerController.delete.bind(
    customerController,
  ),
);

export default router;