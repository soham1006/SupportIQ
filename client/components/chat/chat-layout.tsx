'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ChatSidebar } from './chat-sidebar';
import { ChatWindow } from './chat-window';

export function ChatLayout() {
  const [
    conversationId,
    setConversationId,
  ] = useState<string>();

  const [
    open,
    setOpen,
  ] = useState(false);

  function selectConversation(
    id: string,
  ) {
    setConversationId(id);
    setOpen(false);
  }

  function newChat() {
    setConversationId(undefined);
    setOpen(false);
  }

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-border bg-card">

      {/* Desktop Sidebar */}

      <div className="hidden w-[260px] shrink-0 border-r border-border xl:block xl:w-[320px]">

        <ChatSidebar
          conversationId={conversationId}
          onSelect={selectConversation}
          onNewChat={newChat}
        />

      </div>

      {/* Chat */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Mobile Chat Header */}

        <div className="flex items-center gap-3 border-b border-border p-4 xl:hidden">

          <Sheet
            open={open}
            onOpenChange={setOpen}
          >

            <SheetTrigger asChild>

              <Button
                variant="ghost"
                size="icon"
              >
                <Menu size={20} />
              </Button>

            </SheetTrigger>

            <SheetContent
              side="left"
              className="[&>button]:hidden w-[280px] p-0"
            >

              <ChatSidebar
                conversationId={conversationId}
                onSelect={selectConversation}
                onNewChat={newChat}
              />

            </SheetContent>

          </Sheet>

          <h2 className="text-lg font-semibold">
            AI Assistant
          </h2>

        </div>

        <ChatWindow
          conversationId={conversationId}
          onConversationCreated={setConversationId}
        />

      </div>

    </div>
  );
}