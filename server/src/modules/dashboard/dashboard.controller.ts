import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';

import { dashboardService } from './dashboard.service';

export class DashboardController {
  /* ---------------- Admin Stats ---------------- */

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

  /* ---------------- Agent Dashboard ---------------- */

  async getAgentStats(
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
        await dashboardService.getAgentStats(
          req.user.id,
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

  /* ---------------- Agent Workload ---------------- */

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

  /* ---------------- Recent Tickets ---------------- */

  async getRecentTickets(
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

      const tickets =
        await dashboardService.getRecentTickets(
          req.user.organizationId,
        );

      res.json({
        success: true,
        data: tickets,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController =
  new DashboardController();