import { Router } from 'express';
import { validate } from '../../shared/middleware/validate';
import { authController } from './auth.controller';
import { authenticate } from './auth.middleware';
import { authorize } from './auth.middleware';
import { UserRole } from '@prisma/client';

import {
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
  registerSchema,
} from './auth.validation';

const router = Router();

router.post(
  '/register',
  validate(registerSchema),
  authController.register.bind(authController),
);

router.post(
  '/login',
  validate(loginSchema),
  authController.login.bind(authController),
);

router.post(
  "/refresh",
  validate(refreshTokenSchema),
  authController.refresh.bind(authController),
);

router.post(
  '/logout',
  authController.logout.bind(authController),
);

router.get(
  '/me',
  authenticate,
  authController.me.bind(authController),
);

router.get(
  '/admin-test',
  authenticate,
  authorize(UserRole.ADMIN),
  (_req, res) => {
    res.json({
      success: true,
      message: 'Welcome Admin',
    });
  },
);

router.get(
  '/agent-test',
  authenticate,
  authorize(
    UserRole.AGENT,
    UserRole.ADMIN,
  ),
  (_req, res) => {
    res.json({
      success: true,
      message: 'Welcome Agent',
    });
  },
);

export default router;