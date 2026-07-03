import { NextFunction, Response } from 'express';
import { AuthRequest } from '../../shared/types/AuthRequest';
import { verifyAccessToken } from './jwt';
import { authRepository } from './auth.repository';
import { ApiError } from '../../utils/ApiError';
import { UserRole } from '@prisma/client';

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ApiError(401, 'Authorization header missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Invalid authorization header');
    }

    const token = authHeader.split(' ')[1];

    const payload = verifyAccessToken(token);

    const user = await authRepository.findUserById(payload.userId);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'Account is disabled');
    }

    req.user = {
  id: user.id,
  email: user.email,
  role: user.role,
  organizationId: user.organizationId,
};

    next();
  } catch (error) {
    next(error);
  }
  
};

export const authorize =
  (...roles: UserRole[]) =>
  (
    req: AuthRequest,
    _res: Response,
    next: NextFunction,
  ): void => {
    if (!req.user) {
      next(new ApiError(401, 'Unauthorized'));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError(403, 'Forbidden'));
      return;
    }

    next();
  };