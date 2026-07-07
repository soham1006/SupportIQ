'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

export function SettingsPage() {
  return (
    <DashboardLayout>
      <PageContainer>

        <PageHeader
          title="Settings"
          description="Manage your account and workspace."
        />

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-lg font-semibold">
              Profile
            </h2>

            <div className="space-y-4">

              <input
                defaultValue="Soham"
                className="w-full rounded-lg border px-3 py-2"
              />

              <input
                defaultValue="Admin"
                className="w-full rounded-lg border px-3 py-2"
              />

              <button className="rounded-lg bg-emerald-600 px-5 py-2 text-white">

                Save Changes

              </button>

            </div>

          </div>

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-lg font-semibold">

              Organization

            </h2>

            <p className="text-sm text-muted-foreground">

              Workspace settings coming soon.

            </p>

          </div>

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-lg font-semibold">

              Notifications

            </h2>

            <p className="text-sm text-muted-foreground">

              Email and push notifications.

            </p>

          </div>

          <div className="rounded-xl border bg-card p-6">

            <h2 className="mb-4 text-lg font-semibold">

              Security

            </h2>

            <p className="text-sm text-muted-foreground">

              Password and account security.

            </p>

          </div>

        </div>

      </PageContainer>
    </DashboardLayout>
  );
}