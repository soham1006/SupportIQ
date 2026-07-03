import { prisma } from '../database/prisma';
import { hashPassword } from '../modules/auth/auth.utils';
import { UserRole } from '@prisma/client';

async function run() {
  const password = await hashPassword('password123');

  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@supportiq.com',
      password,
      role: UserRole.AGENT,
      organization: {
        connect: {
          id: 'cmr0cyi3s0000pd5ouofy8ndd',
        },
      },
      skills: ['Node.js', 'PostgreSQL'],
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@supportiq.com',
      password,
      role: UserRole.AGENT,
      organization: {
        connect: {
          id: 'cmr0cyi3s0000pd5ouofy8ndd',
        },
      },
      skills: ['React', 'TypeScript'],
      isActive: true,
    },
  });

  console.log('Agents created');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());