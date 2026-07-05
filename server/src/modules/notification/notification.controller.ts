import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { notificationService } from './notification.service';

export class NotificationController {
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

      const notifications =
        await notificationService.getAll(
          req.user.id,
        );

      res.json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(
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

      const count =
        await notificationService.getUnreadCount(
          req.user.id,
        );

      res.json({
        success: true,
        data: {
          count,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(
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

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await notificationService.markAsRead(
        id,
        req.user.id,
      );

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(
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

      await notificationService.markAllAsRead(
        req.user.id,
      );

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const notificationController =
  new NotificationController();