import { RoleGuard } from '@/components/auth/role-guard';
import { CustomerDashboard } from '@/features/customer/customer-dashboard';

export default function Page() {
  return (
    <RoleGuard
      allowedRoles={['CUSTOMER']}
    >
      <CustomerDashboard />
    </RoleGuard>
  );
}