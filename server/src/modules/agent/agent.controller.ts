import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';

import { agentService } from './agent.service';

import {
  CreateAgentInput,
  UpdateAgentInput,
} from './agent.validation';

export class AgentController {
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

      const agents =
        await agentService.getAll(
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

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      const agent =
        await agentService.getById(
          id,
          req.user.organizationId,
        );

      if (!agent) {
        return res.status(404).json({
          success: false,
          message: 'Agent not found',
        });
      }

      res.json({
        success: true,
        data: agent,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(
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

      const body =
        req.body as CreateAgentInput;

      const agent =
        await agentService.create({
          ...body,
          organizationId:
            req.user.organizationId,
        });

      res.status(201).json({
        success: true,
        data: agent,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(
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

      const body =
        req.body as UpdateAgentInput;

      await agentService.update(
        id,
        req.user.organizationId,
        body,
      );

      res.json({
        success: true,
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

      const id = Array.isArray(req.params.id)
        ? req.params.id[0]
        : req.params.id;

      await agentService.delete(
        id,
        req.user.organizationId,
      );

      res.json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const agentController =
  new AgentController();