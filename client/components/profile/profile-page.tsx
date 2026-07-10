'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

import { useProfile } from '@/features/profile/use-profile';

import { ProfileCard } from './profile-card';
import { AccountCard } from './account-card';
import { SecurityCard } from './security-card';

export function ProfilePage() {
  const { data, isLoading } =
    useProfile();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  if (!data) {
  return (
    <DashboardLayout>
      <div className="flex h-64 items-center justify-center">
        Unable to load profile.
      </div>
    </DashboardLayout>
  );
}

const profile = data.data;

  return (
    <DashboardLayout>

      <PageContainer>

        <PageHeader
          title="Profile"
          description="Manage your account information."
        />

        <div className="grid gap-6 xl:grid-cols-3">

          <ProfileCard
            profile={profile}
          />

          <div className="space-y-6 xl:col-span-2">

            <AccountCard
              profile={profile}
            />

            <SecurityCard />

          </div>

        </div>

      </PageContainer>

    </DashboardLayout>
  );
}