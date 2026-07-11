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
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const roleLabel =
    profile.role === 'ADMIN'
      ? 'Administrator'
      : profile.role === 'AGENT'
        ? 'Support Agent'
        : 'Customer';

  return (
    <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Ink Wash Header */}

      <div className="relative h-28 overflow-hidden border-b border-border bg-muted/60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,113,108,0.18),transparent_50%)]" />

        <div className="absolute -right-12 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Body */}

      <div className="-mt-14 px-6 pb-8 sm:px-8">
        {/* Avatar */}

        <div className="relative flex justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-card bg-primary text-3xl font-semibold tracking-tight text-primary-foreground shadow-sm">
            {initials || 'U'}
          </div>
        </div>

        {/* Main Information */}

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            {profile.name}
          </h2>

          <p className="mt-1 break-all text-sm text-muted-foreground">
            {profile.email}
          </p>

          <Badge
            variant="secondary"
            className="mt-4"
          >
            {roleLabel}
          </Badge>
        </div>

        {/* Details */}

        <div className="mt-8 space-y-5 border-t border-border pt-6">
          {/* Email */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <Mail
                size={18}
                className="text-muted-foreground"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Email
              </p>

              <p className="truncate text-sm font-medium">
                {profile.email}
              </p>
            </div>
          </div>

          {/* Organization */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <Building2
                size={18}
                className="text-muted-foreground"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Organization
              </p>

              <p className="truncate text-sm font-medium">
                {profile.organization.name}
              </p>
            </div>
          </div>

          {/* Role */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <ShieldCheck
                size={18}
                className="text-muted-foreground"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                Role
              </p>

              <p className="text-sm font-medium">
                {roleLabel}
              </p>
            </div>
          </div>

          {/* User ID */}

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
              <UserCircle2
                size={18}
                className="text-muted-foreground"
              />
            </div>

            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                User ID
              </p>

              <p
                className="truncate font-mono text-xs text-muted-foreground"
                title={profile.id}
              >
                {profile.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}