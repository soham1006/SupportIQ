'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { PageContainer } from '@/components/ui/page-container';
import { PageHeader } from '@/components/ui/page-header';

import { useProfile } from '@/features/profile/use-profile';

import { AccountCard } from './account-card';
import { ProfileCard } from './profile-card';
import { SecurityCard } from './security-card';

export function ProfilePage() {
  const {
    data,
    isLoading,
    isError,
  } = useProfile();

  if (isLoading) {
    return (
      <DashboardLayout>
        <PageContainer>
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary" />

              <p className="mt-4 text-sm text-muted-foreground">
                Loading your profile...
              </p>
            </div>
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  if (
    isError ||
    !data?.data
  ) {
    return (
      <DashboardLayout>
        <PageContainer>
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="max-w-md text-center">
              <h2 className="text-xl font-semibold">
                Unable to load profile
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                We couldn&apos;t load your account information.
                Please refresh the page and try again.
              </p>
            </div>
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  const profile = data.data;

 return (
  <DashboardLayout>
    <PageContainer>
      <PageHeader
        title="Profile"
        description="Manage your account information and security settings."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        {/* Top Left */}

        <ProfileCard
          profile={profile}
        />

        {/* Top Right */}

        <AccountCard
          profile={profile}
        />

        {/* Full Width Below */}

        <div className="xl:col-span-2">
          <SecurityCard />
        </div>
      </div>
    </PageContainer>
  </DashboardLayout>
);
}