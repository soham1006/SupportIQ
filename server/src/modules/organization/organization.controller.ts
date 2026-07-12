import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  organizationService,
} from './organization.service';

export class OrganizationController {
  async getPublicWorkspace(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const slug = Array.isArray(
        req.params.slug,
      )
        ? req.params.slug[0]
        : req.params.slug;

      const workspace =
        await organizationService.getPublicWorkspace(
          slug,
        );

      res.json({
        success: true,
        data: workspace,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const organizationController =
  new OrganizationController();