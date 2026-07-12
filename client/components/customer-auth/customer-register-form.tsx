'use client';

import {
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  Eye,
  EyeOff,
} from 'lucide-react';

import {
  toast,
} from 'sonner';

import {
  useCustomerRegister,
} from '@/features/customer-auth/use-customer-register';

import {
  Button,
} from '@/components/ui/button';

import {
  Card,
} from '@/components/ui/card';

import {
  Input,
} from '@/components/ui/input';

import {
  Label,
} from '@/components/ui/label';

interface Props {
  workspaceName: string;
  workspaceSlug: string;
}

export function CustomerRegisterForm({
  workspaceName,
  workspaceSlug,
}: Props) {
  const router =
    useRouter();

  const registerCustomer =
    useCustomerRegister();

  const [
    name,
    setName,
  ] = useState('');

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      await registerCustomer.mutateAsync({
        name,
        email,
        password,
        workspaceSlug,
      });

      toast.success(
        'Account created successfully!',
      );

      router.push('/login');
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ??
          'Failed to create account.',
      );
    }
  }

  return (
    <Card className="rounded-3xl p-8 shadow-xl">
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">
          Create your account
        </h2>

        <p className="mt-2 text-muted-foreground">
          Join {workspaceName} to get support.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="name">
            Full Name
          </Label>

          <Input
            id="name"
            value={name}
            onChange={event =>
              setName(
                event.target.value,
              )
            }
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email
          </Label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={event =>
              setEmail(
                event.target.value,
              )
            }
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              value={password}
              onChange={event =>
                setPassword(
                  event.target.value,
                )
              }
              placeholder="Minimum 8 characters"
              minLength={8}
              className="pr-12"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  value => !value,
                )
              }
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
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
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={
            registerCustomer.isPending
          }
        >
          {registerCustomer.isPending
            ? 'Creating Account...'
            : 'Create Account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?

        <button
          type="button"
          onClick={() =>
            router.push('/login')
          }
          className="ml-2 font-medium text-primary hover:underline"
        >
          Login
        </button>
      </p>
    </Card>
  );
}