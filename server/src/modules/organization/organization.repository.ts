import { prisma } from '../../database/prisma';

export class OrganizationRepository {
  async create(name: string) {
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    let slug = baseSlug;
    let count = 1;

    while (
      await prisma.organization.findUnique({
        where: {
          slug,
        },
      })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    return prisma.organization.create({
      data: {
        name,
        slug,
      },
    });
  }
}

export const organizationRepository =
  new OrganizationRepository();