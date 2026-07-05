import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';
import { analyticsService } from './analytics.service';

export class AnalyticsController {
  async getOverview(
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

      const overview =
        await analyticsService.getOverview(
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: overview,
      });
    } catch (error) {
      next(error);
    }
  }
  async getTicketStatus(
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

    const data =
      await analyticsService.getTicketStatus(
        req.user.organizationId,
      );

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
}

async getTicketTrend(
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

    const trend =
      await analyticsService.getTicketTrend(
        req.user.organizationId,
      );

    res.json({
      success: true,
      data: trend,
    });
  } catch (error) {
    next(error);
  }
}

async getTopAgents(
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
      await analyticsService.getTopAgents(
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

export const analyticsController =
  new AnalyticsController();