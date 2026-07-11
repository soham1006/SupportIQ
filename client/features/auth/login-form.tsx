'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Brain,
  Database,
  Eye,
  EyeOff,
  ShieldCheck,
  Ticket,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  loginSchema,
  LoginForm as LoginFormData,
} from './login.schema';
import { useAuth } from './use-auth';
import { useLogin } from './use-login';

export function LoginForm() {
  const router = useRouter();

  const loginMutation = useLogin();
  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(
    data: LoginFormData,
  ) {
    try {
      const response =
        await loginMutation.mutateAsync(
          data,
        );

      await login(
        response.data.user,
        response.data.accessToken,
      );

      toast.success(
        'Login successful!',
      );

      const dashboardHref =
        response.data.user.role ===
        'ADMIN'
          ? '/dashboard/admin'
          : response.data.user
                .role === 'AGENT'
            ? '/dashboard/agent'
            : '/dashboard/customer';

      router.replace(
        dashboardHref,
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data
          ?.message ??
          'Invalid email or password.',
      );
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}

        <div className="relative hidden overflow-hidden border-r border-border bg-muted/40 p-16 lg:flex lg:flex-col lg:justify-center">
          {/* Ink Wash Background */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,113,108,0.16),transparent_42%)]" />

          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative max-w-xl">
            {/* Full Logo */}

           <div className="flex items-center gap-4">
  <Image
    src="/brand/supportiq-icon.png"
    alt="SupportIQ"
    width={64}
    height={64}
    className="h-16 w-16 object-contain"
    priority
  />

  <div>
    <h1 className="text-4xl font-semibold tracking-tight">
      SupportIQ
    </h1>

    <p className="mt-1 text-sm text-muted-foreground">
      AI Customer Support
    </p>
  </div>
</div>

            <p className="mt-8 max-w-md text-lg leading-8 text-muted-foreground">
              AI-powered customer
              support that combines
              intelligent knowledge
              retrieval, smart ticket
              routing, and real-time
              analytics.
            </p>

            <div className="mt-14 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card">
                  <Brain
                    size={21}
                    className="text-primary"
                  />
                </div>

                <span className="font-medium">
                  AI Assistant
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card">
                  <Database
                    size={21}
                    className="text-primary"
                  />
                </div>

                <span className="font-medium">
                  Knowledge Base
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card">
                  <Ticket
                    size={21}
                    className="text-primary"
                  />
                </div>

                <span className="font-medium">
                  Smart Ticket
                  Escalation
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card">
                  <ShieldCheck
                    size={21}
                    className="text-primary"
                  />
                </div>

                <span className="font-medium">
                  Role-Based Access
                  Control
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6 lg:p-10">
          <Card className="w-full max-w-md p-8 shadow-xl">
            {/* Mobile Branding */}

            <div className="mb-8 lg:hidden">
              <Image
                src="/brand/supportiq-logo.png"
                alt="SupportIQ"
                width={200}
                height={120}
                className="h-auto w-40 object-contain"
                priority
              />
            </div>

            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome Back
            </h1>

            <p className="mt-2 text-muted-foreground">
              Sign in to continue to
              SupportIQ.
            </p>

            <form
              onSubmit={handleSubmit(
                onSubmit,
              )}
              className="mt-8 space-y-5"
            >
              <div>
                <Label>
                  Email
                </Label>

                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...register(
                    'email',
                  )}
                />

                {errors.email
                  ?.message && (
                  <p className="mt-1 text-sm text-destructive">
                    {
                      errors.email
                        .message
                    }
                  </p>
                )}
              </div>

              <div>
                <Label>
                  Password
                </Label>

                <div className="relative">
                  <Input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    placeholder="••••••••"
                    className="pr-12"
                    {...register(
                      'password',
                    )}
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                    onClick={() =>
                      setShowPassword(
                        value =>
                          !value,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={18}
                      />
                    ) : (
                      <Eye
                        size={18}
                      />
                    )}
                  </button>
                </div>

                {errors.password
                  ?.message && (
                  <p className="mt-1 text-sm text-destructive">
                    {
                      errors
                        .password
                        .message
                    }
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  loginMutation.isPending
                }
              >
                {loginMutation.isPending
                  ? 'Signing In...'
                  : 'Login'}
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don&apos;t have an
              account?

              <Link
                href="/register"
                className="ml-2 font-medium text-primary hover:underline"
              >
                Create Workspace
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}