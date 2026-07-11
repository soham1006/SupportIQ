'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/features/auth/use-auth';

export function LandingNavbar() {
  const {
    user,
    logout,
  } = useAuth();

  const router = useRouter();

  const dashboardHref =
    user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : user?.role === 'AGENT'
        ? '/dashboard/agent'
        : '/dashboard/customer';

  async function handleLogout() {
    try {
      await logout();

      toast.success(
        'Logged out successfully',
      );

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 supports-[backdrop-filter]:backdrop-blur-xl">

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >


            <Image
  src="/brand/supportiq-icon.png"
  alt="SupportIQ"
  width={40}
  height={40}
  className="h-10 w-10 object-contain"
  priority
/>

          <div>

            <p className="text-lg font-semibold tracking-tight">
              SupportIQ
            </p>

            <p className="text-xs text-muted-foreground">
              AI Customer Support
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">

          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>

          <a
            href="#workflow"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Workflow
          </a>

          <a
            href="#faq"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            FAQ
          </a>

        </nav>

        {/* Actions */}

        <div className="flex items-center gap-3">

          {user ? (
            <>

              <Button
                asChild
                variant="ghost"
              >
                <Link href={dashboardHref}>
                  Dashboard
                </Link>
              </Button>

              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                Logout
              </Button>

            </>
          ) : (
            <>

              <Button
                asChild
                variant="ghost"
              >
                <Link href="/login">
                  Login
                </Link>
              </Button>

              <Button asChild>
                <Link href="/register">
                  Get Started
                </Link>
              </Button>

            </>
          )}

        </div>

      </div>

    </header>
  );
}