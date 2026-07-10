import { ApiError } from '../../utils/ApiError';

import { profileRepository } from './profile.repository';

import {
  comparePassword,
  hashPassword,
} from '../auth/auth.utils';

export class ProfileService {
  async getProfile(
    userId: string,
  ) {
    const profile =
      await profileRepository.findById(
        userId,
      );

    if (!profile) {
      throw new ApiError(
        404,
        'User not found',
      );
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    name: string,
  ) {
    return profileRepository.updateProfile(
      userId,
      name,
    );
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user =
      await profileRepository.findUserWithPassword(
        userId,
      );

    if (!user) {
      throw new ApiError(
        404,
        'User not found',
      );
    }

    const isMatch =
      await comparePassword(
        currentPassword,
        user.password,
      );

    if (!isMatch) {
      throw new ApiError(
        400,
        'Current password is incorrect',
      );
    }

    const hashedPassword =
      await hashPassword(
        newPassword,
      );

    await profileRepository.updatePassword(
      userId,
      hashedPassword,
    );
  }
}

export const profileService =
  new ProfileService();