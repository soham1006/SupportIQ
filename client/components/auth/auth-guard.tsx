'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/features/auth/use-auth';

interface Props {
  children: React.ReactNode;
}

export function AuthGuard({
  children,
}: Props) {
  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.replace('/login');
    }
  }, [
    loading,
    user,
    router,
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

  return children;
}