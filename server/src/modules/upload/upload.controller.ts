import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { uploadService } from './upload.service';

export class UploadController {
  async upload(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized',
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const result =
        await uploadService.uploadDocument(
          req.file,
          req.user.organizationId,
          req.user.id,
        );

      return res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const uploadController =
  new UploadController();