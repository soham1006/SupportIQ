import { RoleGuard } from '@/components/auth/role-guard';
import { AdminDashboard } from '@/features/admin/admin-dashboard';

export default function Page() {
  return (
    <RoleGuard
      allowedRoles={['ADMIN']}
    >
      <AdminDashboard />
    </RoleGuard>
  );
}