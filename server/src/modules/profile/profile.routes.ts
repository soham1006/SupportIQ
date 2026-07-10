import { Router } from 'express';

import { authenticate } from '../auth/auth.middleware';

import { validate } from '../../shared/middleware/validate';

import {
  changePasswordSchema,
  updateProfileSchema,
} from './profile.validation';

import { profileController } from './profile.controller';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  profileController.getProfile.bind(
    profileController,
  ),
);

router.patch(
  '/',
  validate(updateProfileSchema),
  profileController.updateProfile.bind(
    profileController,
  ),
);

router.patch(
  '/password',
  validate(changePasswordSchema),
  profileController.changePassword.bind(
    profileController,
  ),
);

export default router;