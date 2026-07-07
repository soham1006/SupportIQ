'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Brain,
  ShieldCheck,
  Ticket,
  Database,
  Eye,
  EyeOff,
} from 'lucide-react';

import {
  loginSchema,
  LoginForm as LoginFormData,
} from './login.schema';

import { useLogin } from './use-login';

import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { toast } from 'sonner';

export function LoginForm() {
  const router = useRouter();

  const login = useLogin();

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
        await login.mutateAsync(data);

      localStorage.setItem(
        'accessToken',
        response.data.accessToken,
      );

      toast.success(
        'Login successful!',
      );

      const role =
        response.data.user.role;

      switch (role) {
        case 'ADMIN':
        case 'SUPER_ADMIN':
          router.push(
            '/dashboard/admin',
          );
          break;

        case 'AGENT':
          router.push(
            '/dashboard/agent',
          );
          break;

        default:
          router.push(
            '/dashboard/customer',
          );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          'Invalid email or password.',
      );
    }
  }

  return (
    <main className="min-h-screen bg-background">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-16 text-white">

          <h1 className="text-5xl font-bold">
            SupportIQ
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-emerald-50">
            AI-powered customer support platform
            using Retrieval-Augmented Generation,
            smart ticket routing and real-time
            analytics.
          </p>

          <div className="mt-14 space-y-8">

            <div className="flex items-center gap-4">
              <Brain size={26} />
              <span className="text-lg">
                AI Assistant
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Database size={26} />
              <span className="text-lg">
                Knowledge Base
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Ticket size={26} />
              <span className="text-lg">
                Smart Ticket Escalation
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck size={26} />
              <span className="text-lg">
                Enterprise Ready
              </span>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center p-6">

          <Card className="w-full max-w-md p-8 shadow-xl">

            <h2 className="text-3xl font-bold">
              Welcome Back
            </h2>

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

                <Label>Email</Label>

                <Input
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.email
                      ?.message
                  }
                </p>

              </div>

              <div>

                <Label>Password</Label>

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
                    onClick={() =>
                      setShowPassword(
                        !showPassword,
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
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

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.password
                      ?.message
                  }
                </p>

              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={
                  login.isPending
                }
              >
                {login.isPending
                  ? 'Signing In...'
                  : 'Login'}
              </Button>

            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">

              Dont have an account?

              <Link
                href="/register"
                className="ml-2 font-medium text-emerald-500 hover:underline"
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