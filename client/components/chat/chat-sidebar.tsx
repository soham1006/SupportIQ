'use client';

import {
  MessageSquare,
  Plus,
} from 'lucide-react';

import { useConversations } from '@/features/chat/use-conversations';

interface Props {
  conversationId?: string;

  onSelect: (
    id: string,
  ) => void;

  onNewChat: () => void;
}

export function ChatSidebar({
  conversationId,
  onSelect,
  onNewChat,
}: Props) {
  const {
    data,
    isLoading,
  } =
    useConversations();

  if (isLoading) {
    return (
      <aside className="flex min-h-0 flex-col border-r border-border">

        <div className="border-b border-border p-5">

          <div className="flex items-center justify-between">

            <h2 className="text-lg font-semibold">
              Conversations
            </h2>

            <button
              disabled
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground opacity-50"
            >
              <Plus size={18} />
            </button>

          </div>

        </div>

        <div className="p-6 text-sm text-muted-foreground">
          Loading conversations...
        </div>

      </aside>
    );
  }

  return (
<aside className="flex min-h-0 flex-col border-r border-border">
      {/* Header */}

      <div className="border-b border-border p-5">

        <div className="flex items-center justify-between">

          <h2 className="text-lg font-semibold">
            Conversations
          </h2>

          <button
            onClick={onNewChat}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:opacity-90"
            title="New Chat"
          >
            <Plus size={18} />
          </button>

        </div>

      </div>

      {/* Conversations */}

<div className="min-h-0 flex-1 overflow-y-auto p-3">
  <div className="space-y-2 p-3">
        {data?.data.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No conversations yet.
          </div>
        )}

        {data?.data.map(
          conversation => (

            <button
              key={
                conversation.id
              }
              onClick={() =>
                onSelect(
                  conversation.id,
                )
              }
              className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                conversation.id ===
                conversationId
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >

              <MessageSquare
                size={18}
                className="mt-1 shrink-0"
              />

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium">

                  {conversation
                    .messages[0]
                    ?.content ??
                    'New Conversation'}

                </p>

                <p className="mt-1 truncate text-xs opacity-70">

                  {new Date(
                    conversation.updatedAt,
                  ).toLocaleDateString()}

                </p>

              </div>

            </button>

          ),
        )}

      </div>
      </div>

    </aside>
  );
}