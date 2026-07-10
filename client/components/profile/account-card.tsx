'use client';

import { useEffect, useState } from 'react';

import {
  Building2,
  Mail,
  Save,
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

  return (
    <Card className="rounded-3xl border-0 shadow-xl">

      {/* Header */}

      <div className="border-b px-8 py-6">

        <h2 className="text-2xl font-bold">
          Account Information
        </h2>

        <p className="mt-1 text-muted-foreground">
          Update your personal details.
        </p>

      </div>

      {/* Form */}

      <div className="space-y-8 p-8">

        {/* Name */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <Label className="mb-2 flex items-center gap-2">

              <User size={16} />

              Full Name

            </Label>

            <Input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value,
                )
              }
            />

          </div>

          <div>

            <Label className="mb-2 flex items-center gap-2">

              <Mail size={16} />

              Email

            </Label>

            <Input
              value={profile.email}
              disabled
            />

          </div>

        </div>

        {/* Organization */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <Label className="mb-2 flex items-center gap-2">

              <Building2 size={16} />

              Organization

            </Label>

            <Input
              value={
                profile.organization
                  .name
              }
              disabled
            />

          </div>

          <div>

            <Label className="mb-2">
              Role
            </Label>

            <Input
              value={profile.role}
              disabled
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end">

          <Button
            size="lg"
            disabled={
              updateProfile.isPending
            }
            onClick={() =>
              updateProfile.mutate({
                name,
              })
            }
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