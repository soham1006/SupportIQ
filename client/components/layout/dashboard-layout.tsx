'use client';

import { AuthGuard } from '@/components/auth/auth-guard';

import { Sidebar } from './sidebar';
import { SidebarProvider } from './sidebar-context';
import { Topbar } from './topbar';

interface Props {
  children: React.ReactNode;
}

export function DashboardLayout({
  children,
}: Props) {
  return (
    <AuthGuard>

      <SidebarProvider>

        <div
          className="
          flex
          h-screen
          overflow-hidden

          bg-background
          text-foreground
          "
        >

          {/* Sidebar */}

          <Sidebar />

          {/* Main */}

          <div
            className="
            relative

            flex
            min-w-0
            flex-1
            flex-col

            overflow-hidden
            "
          >

            {/* Ink Wash Background */}

            <div
              className="
              pointer-events-none
              absolute
              inset-0
              "
            >

              <div
                className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_top_right,rgba(120,113,108,.10),transparent_32%)]
                "
              />

              <div
                className="
                absolute
                inset-0

                bg-[radial-gradient(circle_at_bottom_left,rgba(168,162,158,.06),transparent_40%)]
                "
              />

            </div>

            {/* Topbar */}

            <Topbar />

            {/* Page */}

            <main
              className="
              relative

              flex-1

              overflow-y-auto
              "
            >

              <div
                className="
                mx-auto

                h-full
                w-full
                max-w-7xl

                px-6
                py-8

                lg:px-8
                lg:py-10
                "
              >

                {children}

              </div>

            </main>

          </div>

        </div>

      </SidebarProvider>

    </AuthGuard>
  );
}