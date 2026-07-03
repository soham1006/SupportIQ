import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ChatPage } from '@/features/chat/chat-page';

export default function Chat() {
  return (
    <DashboardLayout>
      <ChatPage />
    </DashboardLayout>
  );
}