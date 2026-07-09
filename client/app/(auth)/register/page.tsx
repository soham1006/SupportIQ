import { GuestGuard } from '@/components/auth/guest-guard';
import { RegisterForm } from '@/features/auth/register-form';

export default function Page() {
  return (
    <GuestGuard>
      <RegisterForm />
    </GuestGuard>
  );
}