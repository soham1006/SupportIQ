import {
  Router,
} from 'express';

import {
  organizationController,
} from './organization.controller';

const router = Router();

router.get(
  '/public/:slug',
  organizationController.getPublicWorkspace.bind(
    organizationController,
  ),
);

export default router;