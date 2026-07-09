import { api } from '@/lib/api';

export interface RegisterData {
  organizationName: string;
  name: string;
  email: string;
  password: string;
}

export async function register(
  data: RegisterData,
) {
  const response = await api.post(
    '/auth/register',
    data,
  );

  return response.data;
}

export interface LoginData {
  email: string;
  password: string;
}

export async function login(
  data: LoginData,
) {
  const response = await api.post(
    '/auth/login',
    data,
  );

  return response.data;
}

export async function getMe() {
  const response =
    await api.get('/auth/me');

  return response.data;
}

export async function logout() {
  const response =
    await api.post('/auth/logout', {});

  return response.data;
}