import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { documentService } from './document.service';

export class DocumentController {
  async getAll(
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

      const documents =
        await documentService.getAll(
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: documents,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(
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

      const documentId =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const document =
        await documentService.getById(
          documentId,
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: document,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(
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

      const documentId =
        Array.isArray(req.params.id)
          ? req.params.id[0]
          : req.params.id;

      const result =
        await documentService.delete(
          documentId,
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const documentController =
  new DocumentController();