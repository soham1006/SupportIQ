'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/use-auth';

type UserRole =
  | 'ADMIN'
  | 'AGENT'
  | 'CUSTOMER';

interface Props {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
}: Props) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      const dashboardHref =
        user.role === 'ADMIN'
          ? '/dashboard/admin'
          : user.role === 'AGENT'
            ? '/dashboard/agent'
            : '/dashboard/customer';

      router.replace(dashboardHref);
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
        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  if (
    !user ||
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Redirecting...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}