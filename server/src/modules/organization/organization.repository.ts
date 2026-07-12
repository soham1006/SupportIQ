import { prisma } from '../../database/prisma';

import {
  createSlug,
} from '../../utils/slug';

export class OrganizationRepository {
  async create(
    name: string,
  ) {
    const baseSlug =
      createSlug(name);

    let slug =
      baseSlug;

    let counter = 1;

    while (
      await prisma.organization.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug =
        `${baseSlug}-${counter}`;

      counter++;
    }

    return prisma.organization.create({
      data: {
        name,
        slug,
      },
    });
  }

  async findBySlug(
    slug: string,
  ) {
    return prisma.organization.findUnique({
      where: {
        slug,
      },
    });
  }
}

export const organizationRepository =
  new OrganizationRepository();