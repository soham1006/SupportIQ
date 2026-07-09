'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/use-auth';

interface Props {
  allowedRoles: Array<
    'ADMIN' | 'AGENT' | 'CUSTOMER'
  >;

  children: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
}: Props) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    if (
      !allowedRoles.includes(user.role)
    ) {
      switch (user.role) {
        case 'ADMIN':
          router.replace(
            '/dashboard/admin',
          );
          break;

        case 'AGENT':
          router.replace(
            '/dashboard/agent',
          );
          break;

        default:
          router.replace(
            '/dashboard/customer',
          );
      }
    }
  }, [
    user,
    loading,
    router,
    allowedRoles,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (
    !allowedRoles.includes(user.role)
  ) {
    return null;
  }

  return children;
}