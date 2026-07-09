import { AgentDashboard } from '@/features/agent/agent-dashboard';
import { RoleGuard } from '@/components/auth/role-guard';

export default function Page() {
  return( 
     <RoleGuard
      allowedRoles={['AGENT']}
    >
      <AgentDashboard />
    </RoleGuard>
    );
}