'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ChatLayout } from '@/components/chat/chat-layout';

export default function ChatPage() {
  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-120px)]">
        <ChatLayout />
      </div>
    </DashboardLayout>
  );
}