'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  Building2,
  Mail,
  Save,
  ShieldCheck,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Profile } from '@/features/profile/types';
import { useUpdateProfile } from '@/features/profile/use-update-profile';

interface Props {
  profile: Profile;
}

export function AccountCard({
  profile,
}: Props) {
  const [name, setName] =
    useState(profile.name);

  const updateProfile =
    useUpdateProfile();

  useEffect(() => {
    setName(profile.name);
  }, [profile.name]);

  const trimmedName =
    name.trim();

  const hasChanges =
    trimmedName !==
    profile.name.trim();

  const canSave =
    trimmedName.length > 0 &&
    hasChanges &&
    !updateProfile.isPending;

  function handleSave() {
    if (!canSave) {
      return;
    }

    updateProfile.mutate({
      name: trimmedName,
    });
  }

  return (
    <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header */}

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Account Information
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your personal and workspace information.
        </p>
      </div>

      {/* Form */}

      <div className="space-y-8 p-6 sm:p-8">
        {/* Personal Information */}

        <div>
          <h3 className="mb-5 text-sm font-medium text-muted-foreground">
            Personal Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}

            <div className="space-y-2">
              <Label
                htmlFor="profile-name"
                className="flex items-center gap-2"
              >
                <User size={16} />

                Full Name
              </Label>

              <Input
                id="profile-name"
                value={name}
                onChange={event =>
                  setName(
                    event.target.value,
                  )
                }
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label
                htmlFor="profile-email"
                className="flex items-center gap-2"
              >
                <Mail size={16} />

                Email
              </Label>

              <Input
                id="profile-email"
                value={profile.email}
                disabled
                readOnly
              />

              <p className="text-xs text-muted-foreground">
                Your email address cannot be changed.
              </p>
            </div>
          </div>
        </div>

        {/* Workspace Information */}

        <div className="border-t border-border pt-8">
          <h3 className="mb-5 text-sm font-medium text-muted-foreground">
            Workspace Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Organization */}

            <div className="space-y-2">
              <Label
                htmlFor="profile-organization"
                className="flex items-center gap-2"
              >
                <Building2 size={16} />

                Organization
              </Label>

              <Input
                id="profile-organization"
                value={
                  profile.organization
                    .name
                }
                disabled
                readOnly
              />
            </div>

            {/* Role */}

            <div className="space-y-2">
              <Label
                htmlFor="profile-role"
                className="flex items-center gap-2"
              >
                <ShieldCheck
                  size={16}
                />

                Role
              </Label>

              <Input
                id="profile-role"
                value={profile.role}
                disabled
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {hasChanges
              ? 'You have unsaved changes.'
              : 'Your profile is up to date.'}
          </p>

          <Button
            size="lg"
            disabled={!canSave}
            onClick={handleSave}
            className="gap-2"
          >
            <Save size={18} />

            {updateProfile.isPending
              ? 'Saving...'
              : 'Save Changes'}
          </Button>
        </div>
      </div>
    </Card>
  );
}