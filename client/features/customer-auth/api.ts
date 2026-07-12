import { api } from '@/lib/api';

export interface PublicWorkspace {
  name: string;
  slug: string;
}

export interface CustomerRegisterInput {
  name: string;
  email: string;
  password: string;
  workspaceSlug: string;
}

export interface WorkspaceResponse {
  success: boolean;
  data: PublicWorkspace;
}

export async function getPublicWorkspace(
  slug: string,
) {
  const response =
    await api.get<WorkspaceResponse>(
      `/organizations/public/${encodeURIComponent(
        slug,
      )}`,
    );

  return response.data;
}

export async function registerCustomer(
  data: CustomerRegisterInput,
) {
  const response =
    await api.post(
      '/auth/customer/register',
      data,
    );

  return response.data;
}