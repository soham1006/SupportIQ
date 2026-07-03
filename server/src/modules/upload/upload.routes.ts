import { Router } from 'express';
import { upload } from './upload.middleware';
import { uploadController } from './upload.controller';

const router = Router();

router.post(
  '/',
  upload.single('document'),
  uploadController.upload.bind(uploadController),
);

export default router;