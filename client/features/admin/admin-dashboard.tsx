'use client';

import {
  Ticket,
  Clock,
  CheckCircle,
  Users,
} from "lucide-react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { useDashboardStats } from '@/features/dashboard/use-dashboard-stats';
import { RecentTickets } from "@/components/dashboard/recent-tickets";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { TicketChart } from "@/components/dashboard/ticket-chart";
import { AgentWorkload } from '@/components/dashboard/agent-workload';

export function AdminDashboard() {
const { data, isLoading } =
  useDashboardStats();

 if (isLoading) {
  return (
    <DashboardLayout>
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading dashboard...
      </div>
    </DashboardLayout>
  );
}
  return (
   <DashboardLayout>
  <div className="space-y-8">

    <DashboardHero />

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <StatsCard
    title="Total Tickets"
    value={data?.data.totalTickets ?? 0}
    icon={Ticket}
  />

  <StatsCard
    title="Open Tickets"
    value={data?.data.openTickets ?? 0}
    icon={Clock}
  />

  <StatsCard
    title="Active Agents"
    value={data?.data.totalAgents ?? 0}
    icon={Users}
  />

  <StatsCard
    title="Knowledge Docs"
    value={data?.data.totalDocuments ?? 0}
    icon={CheckCircle}
  />

</div>

    <TicketChart />

    <div className="grid gap-6 xl:grid-cols-2">

  <RecentTickets />

  <AgentWorkload />

</div>

  </div>
</DashboardLayout>
  );
}