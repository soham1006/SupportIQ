import { ApiError } from '../../utils/ApiError';

import {
  organizationRepository,
} from './organization.repository';

export class OrganizationService {
  async getPublicWorkspace(
    slug: string,
  ) {
    const organization =
      await organizationRepository.findBySlug(
        slug,
      );

    if (!organization) {
      throw new ApiError(
        404,
        'Workspace not found',
      );
    }

    return {
      name: organization.name,
      slug: organization.slug,
    };
  }
}

export const organizationService =
  new OrganizationService();