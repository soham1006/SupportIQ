'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/auth/use-login';
import { useAuthStore } from '@/store/auth.store';
import {
  loginSchema,
  LoginFormData,
} from '@/features/auth/login.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function LoginPage() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

const loginMutation = useLogin();

const { setAccessToken } = useAuthStore();

const onSubmit = async (
  data: LoginFormData,
) => {
  try {
    const response =
      await loginMutation.mutateAsync(data);

    const token =
      response.data.accessToken;

    setAccessToken(token);

    localStorage.setItem(
      'accessToken',
      token,
    );

    const role =
      response.data.user.role;

    switch (role) {
      case 'ADMIN':
        router.push('/dashboard/admin');
        break;

      case 'AGENT':
        router.push('/dashboard/agent');
        break;

      default:
        router.push('/dashboard/customer');
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            SupportIQ Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <Input
              type="email"
              placeholder="Email"
              {...form.register('email')}
            />

            <Input
              type="password"
              placeholder="Password"
              {...form.register('password')}
            />

            <Button
              className="w-full"
              type="submit"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}