import { UserRole } from '@prisma/client';
import { authRepository } from './auth.repository';
import { RegisterInput } from './auth.validation';
import { hashPassword } from './auth.utils';
import { ApiError } from '../../utils/ApiError';
import { LoginInput } from './auth.validation';
import { comparePassword } from './auth.utils';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from './jwt';

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await authRepository.findUserByEmail(
      data.email,
    );

    if (existingUser) {
      throw new ApiError(
  409,
  'Email already exists',
);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await authRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: UserRole.CUSTOMER,

      organization: {
        connect: {
          id: data.organizationId,
        },
      },
    });

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    const expiresAt = new Date();

    expiresAt.setDate(
      expiresAt.getDate() + 7,
    );

    await authRepository.saveRefreshToken(
      user.id,
      refreshToken,
      expiresAt,
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

      accessToken,

      refreshToken,
    };
  }

  async login(data: LoginInput) {
  const user = await authRepository.findUserByEmail(data.email);

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await comparePassword(
    data.password,
    user.password,
  );

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  await authRepository.saveRefreshToken(
    user.id,
    refreshToken,
    expiresAt,
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
}

async refresh(refreshToken: string) {

  const decoded =
    verifyRefreshToken(refreshToken);

  const storedToken =
    await authRepository.findRefreshToken(
      refreshToken,
    );

  if (!storedToken) {
    throw new ApiError(
      401,
      'Invalid refresh token',
    );
  }

  const user =
    await authRepository.findUserById(
      decoded.userId,
    );

  if (!user) {
    throw new ApiError(
      404,
      'User not found',
    );
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(payload);

  const newRefreshToken =
    generateRefreshToken(payload);

  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() + 7,
  );

  await authRepository.replaceRefreshToken(
    refreshToken,
    newRefreshToken,
    expiresAt,
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}
async logout(refreshToken: string): Promise<void> {
  const storedToken = await authRepository.findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  await authRepository.deleteRefreshToken(refreshToken);
}
}

export const authService =
  new AuthService();