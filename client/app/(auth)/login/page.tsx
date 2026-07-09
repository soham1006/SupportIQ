import { GuestGuard } from '@/components/auth/guest-guard';
import { LoginForm } from '@/features/auth/login-form';

export default function Page() {
  return (
    <GuestGuard>
      <LoginForm />
    </GuestGuard>
  );
}