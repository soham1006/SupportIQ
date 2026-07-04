import { Router } from 'express';
import { upload } from './upload.middleware';
import { uploadController } from './upload.controller';
import { authenticate } from '../auth/auth.middleware';

const router = Router();

router.post(
  '/',
  authenticate,
  upload.single('document'),
  uploadController.upload.bind(uploadController),
);

export default router;