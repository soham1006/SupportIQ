'use client';

import { useState } from 'react';

import { ChatSidebar } from './chat-sidebar';
import { ChatWindow } from './chat-window';

export function ChatLayout() {
  const [
    conversationId,
    setConversationId,
  ] = useState<string>();

  return (
    <div className="grid h-full overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-[320px_1fr]">

      <ChatSidebar
        conversationId={conversationId}
        onSelect={setConversationId}
        onNewChat={() =>
          setConversationId(undefined)
        }
      />

      <ChatWindow
        conversationId={conversationId}
        onConversationCreated={setConversationId}
      />

    </div>
  );
}