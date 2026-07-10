import {
  NextFunction,
  Response,
} from 'express';

import { AuthRequest } from '../../shared/types/AuthRequest';

import { profileService } from './profile.service';

import {
  ChangePasswordInput,
  UpdateProfileInput,
} from './profile.validation';

export class ProfileController {
  async getProfile(
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

      const profile =
        await profileService.getProfile(
          req.user.id,
        );

      res.json({
        success: true,
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(
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
        req.body as UpdateProfileInput;

      const profile =
        await profileService.updateProfile(
          req.user.id,
          body.name,
        );

      res.json({
        success: true,
        message:
          'Profile updated successfully',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(
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
        req.body as ChangePasswordInput;

      await profileService.changePassword(
        req.user.id,
        body.currentPassword,
        body.newPassword,
      );

      res.json({
        success: true,
        message:
          'Password updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const profileController =
  new ProfileController();