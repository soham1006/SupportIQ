'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/use-auth';

interface Props {
  children: React.ReactNode;
}

export function GuestGuard({
  children,
}: Props) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    const dashboardHref =
      user.role === 'ADMIN'
        ? '/dashboard/admin'
        : user.role === 'AGENT'
          ? '/dashboard/agent'
          : '/dashboard/customer';

    router.replace(dashboardHref);
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading...
        </p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}