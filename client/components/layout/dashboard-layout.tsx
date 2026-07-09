'use client';

import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { SidebarProvider } from './sidebar-context';
import { AuthGuard } from '@/components/auth/auth-guard';

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({
  children,
}: Props) {
  return (
      <AuthGuard>
    <SidebarProvider>

      <div className="flex h-screen overflow-hidden bg-background text-foreground">

        {/* Sidebar */}

        <Sidebar />

        {/* Main */}

        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Background */}

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.06),transparent_35%)]" />

          {/* Topbar */}

          <Topbar />

          {/* Content */}

          <main className="relative flex-1 overflow-y-auto">

            <div className="mx-auto h-full w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8 lg:py-8">

              {children}

            </div>

          </main>

        </div>

      </div>

    </SidebarProvider>
    </AuthGuard>
  );
}