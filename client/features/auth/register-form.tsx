'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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
  registerSchema,
  RegisterForm as RegisterFormData,
} from './register.schema';
import { useState } from 'react';

import { useRegister } from './use-register';

import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function RegisterForm() {
  const router = useRouter();

  const register = useRegister();

  const [showPassword, setShowPassword] =
  useState(false);

const [
  showConfirmPassword,
  setShowConfirmPassword,
] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

 async function onSubmit(
  data: RegisterFormData,
) {
  try {
    const {
      confirmPassword,
      ...payload
    } = data;

    await register.mutateAsync(
      payload,
    );

    toast.success(
      'Workspace created successfully!'
    );

    router.push('/login');

  } catch (error: any) {
    console.error(error);

    toast.error(
      error?.response?.data?.message ??
      'Registration failed.'
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
            AI-powered customer support platform that
            combines Retrieval-Augmented Generation,
            intelligent ticket routing and real-time
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
              Create Workspace
            </h2>

            <p className="mt-2 text-muted-foreground">
              Start using SupportIQ in minutes.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
            >

              <div>

                <Label>
                  Organization
                </Label>

                <Input
                  {...formRegister(
                    'organizationName',
                  )}
                  placeholder="Acme Inc."
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors
                      .organizationName
                      ?.message
                  }
                </p>

              </div>

              <div>

                <Label>
                  Full Name
                </Label>

                <Input
                  {...formRegister(
                    'name',
                  )}
                  placeholder="John Doe"
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.name
                      ?.message
                  }
                </p>

              </div>

              <div>

                <Label>
                  Email
                </Label>

                <Input
                  type="email"
                  {...formRegister(
                    'email',
                  )}
                  placeholder="john@example.com"
                />

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.email
                      ?.message
                  }
                </p>

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
    {...formRegister(
      'password',
    )}
    placeholder="••••••••"
    className="pr-12"
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
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
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

              <div>

                <Label>
                  Confirm Password
                </Label>

                <div className="relative">

  <Input
    type={
      showConfirmPassword
        ? 'text'
        : 'password'
    }
    {...formRegister(
      'confirmPassword',
    )}
    placeholder="••••••••"
    className="pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword,
      )
    }
    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
  >

    {showConfirmPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}

  </button>

</div>

                <p className="mt-1 text-sm text-red-500">
                  {
                    errors
                      .confirmPassword
                      ?.message
                  }
                </p>

              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={register.isPending}
              >
                {register.isPending
                  ? 'Creating Workspace...'
                  : 'Create Workspace'}
              </Button>

            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">

              Already have an account?

              <Link
                href="/login"
                className="ml-2 font-medium text-emerald-500 hover:underline"
              >
                Login
              </Link>

            </p>

          </Card>

        </div>

      </div>

    </main>
  );
}