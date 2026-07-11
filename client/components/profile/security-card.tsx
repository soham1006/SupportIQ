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

  const passwordsMatch =
    newPassword ===
    confirmPassword;

  const isValid =
    currentPassword.length > 0 &&
    newPassword.length >= 8 &&
    confirmPassword.length >= 8 &&
    passwordsMatch;

  function submit() {
    if (
      !isValid ||
      mutation.isPending
    ) {
      return;
    }

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

          setShowCurrent(false);
          setShowNew(false);
          setShowConfirm(false);
        },
      },
    );
  }

  return (
    <Card className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      {/* Header */}

      <div className="border-b border-border px-6 py-6 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
            <ShieldCheck
              size={21}
              className="text-primary"
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Security
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Update your account password.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-8 p-6 sm:p-8">
        {/* Current Password */}

        <div className="space-y-2">
          <Label
            htmlFor="current-password"
            className="flex items-center gap-2"
          >
            <Lock size={16} />

            Current Password
          </Label>

          <div className="relative">
            <Input
              id="current-password"
              type={
                showCurrent
                  ? 'text'
                  : 'password'
              }
              value={currentPassword}
              onChange={event =>
                setCurrentPassword(
                  event.target.value,
                )
              }
              placeholder="Enter your current password"
              className="pr-12"
              autoComplete="current-password"
            />

            <button
              type="button"
              aria-label={
                showCurrent
                  ? 'Hide current password'
                  : 'Show current password'
              }
              onClick={() =>
                setShowCurrent(
                  value => !value,
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showCurrent ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password Fields */}

        <div className="grid gap-6 md:grid-cols-2">
          {/* New Password */}

          <div className="space-y-2">
            <Label htmlFor="new-password">
              New Password
            </Label>

            <div className="relative">
              <Input
                id="new-password"
                type={
                  showNew
                    ? 'text'
                    : 'password'
                }
                value={newPassword}
                onChange={event =>
                  setNewPassword(
                    event.target.value,
                  )
                }
                placeholder="Enter a new password"
                className="pr-12"
                autoComplete="new-password"
              />

              <button
                type="button"
                aria-label={
                  showNew
                    ? 'Hide new password'
                    : 'Show new password'
                }
                onClick={() =>
                  setShowNew(
                    value => !value,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showNew ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {newPassword.length > 0 &&
              newPassword.length < 8 && (
                <p className="text-xs text-destructive">
                  Password must be at least 8 characters.
                </p>
              )}
          </div>

          {/* Confirm Password */}

          <div className="space-y-2">
            <Label htmlFor="confirm-password">
              Confirm Password
            </Label>

            <div className="relative">
              <Input
                id="confirm-password"
                type={
                  showConfirm
                    ? 'text'
                    : 'password'
                }
                value={confirmPassword}
                onChange={event =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                placeholder="Confirm your new password"
                className="pr-12"
                autoComplete="new-password"
              />

              <button
                type="button"
                aria-label={
                  showConfirm
                    ? 'Hide confirm password'
                    : 'Show confirm password'
                }
                onClick={() =>
                  setShowConfirm(
                    value => !value,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {confirmPassword.length > 0 &&
              !passwordsMatch && (
                <p className="text-xs text-destructive">
                  Passwords do not match.
                </p>
              )}
          </div>
        </div>

        {/* Footer */}

        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-muted/40 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium">
              Password Security
            </h3>

            <p className="mt-1 max-w-lg text-sm text-muted-foreground">
              Use at least 8 characters and choose a password
              that you do not use on other websites.
            </p>
          </div>

          <Button
            size="lg"
            onClick={submit}
            disabled={
              !isValid ||
              mutation.isPending
            }
            className="shrink-0"
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