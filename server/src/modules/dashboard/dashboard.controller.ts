import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { dashboardService } from './dashboard.service';

export class DashboardController {
  async getStats(
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

      const stats =
        await dashboardService.getStats(
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAgentWorkload(
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

    const agents =
      await dashboardService.getAgentWorkload(
        req.user.organizationId,
      );

    res.json({
      success: true,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
}
}

export const dashboardController =
  new DashboardController();