'use client';

import {
  Building2,
  Mail,
  ShieldCheck,
  UserCircle2,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

import { Profile } from '@/features/profile/types';

interface Props {
  profile: Profile;
}

export function ProfileCard({
  profile,
}: Props) {
  const initials = profile.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const badgeColor =
    profile.role === 'ADMIN'
      ? 'bg-emerald-500 hover:bg-emerald-500'
      : profile.role === 'AGENT'
        ? 'bg-primary-400 hover:bg-primary-400'
        : 'bg-violet-500 hover:bg-violet-500';

  return (
    <Card className="overflow-hidden rounded-3xl border-0 shadow-xl">

      {/* Header */}

      <div className="h-28 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500" />

      {/* Body */}

      <div className="-mt-14 px-8 pb-8">

        <div className="flex justify-center">

          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-background bg-emerald-500 text-4xl font-bold text-white shadow-lg">

            {initials}

          </div>

        </div>

        <div className="mt-6 text-center">

          <h2 className="text-2xl font-bold">

            {profile.name}

          </h2>

          <p className="mt-1 text-muted-foreground">

            {profile.email}

          </p>

          <Badge
            className={`mt-4 ${badgeColor}`}
          >
            {profile.role}
          </Badge>

        </div>

        <div className="mt-8 space-y-5 border-t pt-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-muted p-2">

              <Mail size={18} />

            </div>

            <div>

              <p className="text-xs text-muted-foreground">
                Email
              </p>

              <p className="font-medium">
                {profile.email}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-muted p-2">

              <Building2 size={18} />

            </div>

            <div>

              <p className="text-xs text-muted-foreground">
                Organization
              </p>

              <p className="font-medium">
                {profile.organization.name}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-muted p-2">

              <ShieldCheck size={18} />

            </div>

            <div>

              <p className="text-xs text-muted-foreground">
                Role
              </p>

              <p className="font-medium">
                {profile.role}
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-muted p-2">

              <UserCircle2 size={18} />

            </div>

            <div>

              <p className="text-xs text-muted-foreground">
                User ID
              </p>

              <p className="truncate text-sm">
                {profile.id}
              </p>

            </div>

          </div>

        </div>

      </div>

    </Card>
  );
}