'use client';

import { useState } from 'react';

import {
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useChangePassword } from '@/features/profile/use-change-password';

export function SecurityCard() {
  const mutation =
    useChangePassword();

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState('');

  const [
    newPassword,
    setNewPassword,
  ] = useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const [
    showCurrent,
    setShowCurrent,
  ] = useState(false);

  const [
    showNew,
    setShowNew,
  ] = useState(false);

  const [
    showConfirm,
    setShowConfirm,
  ] = useState(false);

  function submit() {
    mutation.mutate(
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        onSuccess() {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        },
      },
    );
  }

  return (
    <Card className="rounded-3xl border-0 shadow-xl">

      {/* Header */}

      <div className="border-b px-8 py-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-primary-400/10 p-3">

            <ShieldCheck
              className="text-emerald-500"
              size={22}
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Security
            </h2>

            <p className="text-muted-foreground">
              Change your account password.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-8">

        {/* Current Password */}

        <div>

          <Label className="mb-2 flex items-center gap-2">

            <Lock size={16} />

            Current Password

          </Label>

          <div className="relative">

            <Input
              type={
                showCurrent
                  ? 'text'
                  : 'password'
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value,
                )
              }
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(
                  !showCurrent,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showCurrent ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <Label className="mb-2">
            New Password
          </Label>

          <div className="relative">

            <Input
              type={
                showNew
                  ? 'text'
                  : 'password'
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value,
                )
              }
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(
                  !showNew,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showNew ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <Label className="mb-2">
            Confirm Password
          </Label>

          <div className="relative">

            <Input
              type={
                showConfirm
                  ? 'text'
                  : 'password'
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value,
                )
              }
              className="pr-12"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(
                  !showConfirm,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-between rounded-2xl border bg-muted/40 p-5">

          <div>

            <h3 className="font-semibold">
              Password Security
            </h3>

            <p className="text-sm text-muted-foreground">
              Use at least 8 characters with a
              combination of letters and numbers.
            </p>

          </div>

          <Button
            size="lg"
            onClick={submit}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? 'Updating...'
              : 'Update Password'}
          </Button>

        </div>

      </div>

    </Card>
  );
}