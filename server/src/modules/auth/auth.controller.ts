import {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  CustomerRegisterInput,
} from './auth.validation';

import { authService } from './auth.service';
import { AuthRequest } from '../../shared/types/AuthRequest';
import { ApiError } from '../../utils/ApiError';

export class AuthController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result =
        await authService.register(
          req.body,
        );

      res.cookie(
        'refreshToken',
        result.refreshToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            'production',
          sameSite: 'strict',
          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        },
      );

      res.status(201).json({
        success: true,
        message:
          'User registered successfully',
        data: {
          user: result.user,
          accessToken:
            result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result =
        await authService.login(
          req.body,
        );

      res.cookie(
        'refreshToken',
        result.refreshToken,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            'production',
          sameSite: 'strict',
          maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        },
      );

      res.status(200).json({
        success: true,
        message:
          'Login successful',
        data: {
          user: result.user,
          accessToken:
            result.accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken =
        req.cookies.refreshToken;

      if (!refreshToken) {
        throw new ApiError(
          401,
          'Refresh token missing',
        );
      }

      const result =
        await authService.refresh(
          refreshToken,
        );

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const refreshToken =
        req.cookies.refreshToken;

      if (!refreshToken) {
        throw new ApiError(
          401,
          'Refresh token missing',
        );
      }

      await authService.logout(
        refreshToken,
      );

      res.clearCookie(
        'refreshToken',
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV ===
            'production',
          sameSite: 'strict',
        },
      );

      res.status(200).json({
        success: true,
        message:
          'Logout successful',
      });
    } catch (error) {
      next(error);
    }
  }

  async me(
    req: AuthRequest,
    res: Response,
  ): Promise<void> {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  }

  async registerCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body =
      req.body as CustomerRegisterInput;

    const customer =
      await authService.registerCustomer(
        body,
      );

    res.status(201).json({
      success: true,
      data: customer,
      message:
        'Customer account created successfully',
    });
  } catch (error) {
    next(error);
  }
}
}

export const authController =
  new AuthController();