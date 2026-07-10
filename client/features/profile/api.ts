import { api } from '@/lib/api';

import {
  ChangePasswordData,
  UpdateProfileData,
} from './types';

export async function getProfile() {
  const response =
    await api.get('/profile');

  return response.data;
}

export async function updateProfile(
  data: UpdateProfileData,
) {
  const response =
    await api.patch(
      '/profile',
      data,
    );

  return response.data;
}

export async function changePassword(
  data: ChangePasswordData,
) {
  const response =
    await api.patch(
      '/profile/password',
      data,
    );

  return response.data;
}