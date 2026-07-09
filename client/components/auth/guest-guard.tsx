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

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    switch (user.role) {
      case 'ADMIN':
        router.replace('/dashboard/admin');
        break;

      case 'AGENT':
        router.replace('/dashboard/agent');
        break;

      default:
        router.replace('/dashboard/customer');
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return null;
  }

  return children;
}