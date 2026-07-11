'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Bot } from 'lucide-react';

import { useChat } from '@/features/chat/use-chat';
import { useMessages } from '@/features/chat/use-messages';

import { MessageBubble } from './message-bubble';
import { TypingIndicator } from './typing-indicator';

interface Props {
  conversationId?: string;

  onConversationCreated: (
    id: string,
  ) => void;
}

interface ChatMessage {
  id: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
}

export function ChatWindow({
  conversationId,
  onConversationCreated,
}: Props) {
  const [question, setQuestion] =
    useState('');

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
  } = useMessages(
    conversationId,
  );

  const chat =
    useChat();

const messages: ChatMessage[] =
  data?.data ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [
    messages,
    chat.isPending,
  ]);

  async function sendMessage() {
    if (
      !question.trim() ||
      chat.isPending
    ) {
      return;
    }

    const currentQuestion =
      question.trim();

    setQuestion('');

    try {
      const response =
        await chat.mutateAsync({
          question:
            currentQuestion,

          conversationId,
        });

      if (
        !conversationId
      ) {
        onConversationCreated(
          response.data
            .conversationId,
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex h-full min-h-0 flex-col">

      {/* Header */}

      <div className="border-b border-border p-6">

        <h2 className="text-xl font-semibold">
          AI Assistant
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Ask questions about your
          knowledge base.
        </p>

      </div>

      {/* Messages */}

      <div className="min-h-0 flex-1 overflow-y-auto p-6">

        {isLoading ? (
          <TypingIndicator />
        ) : messages.length ===
          0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">

            <Bot
              size={48}
              className="mb-4 text-primary"
            />

            <h3 className="text-lg font-semibold">
              Start a conversation
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Ask anything about your
              documents, company
              policies, or support
              knowledge base.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {messages.map(
              (
                message,
                index,
              ) => (
                <MessageBubble
                  key={
                    message.id ??
                    index
                  }
                  message={
                    message
                  }
                />
              ),
            )}

            {chat.isPending && (
              <TypingIndicator />
            )}

            <div
              ref={bottomRef}
            />

          </div>
        )}

      </div>

      {/* Input */}

      <div className="border-t border-border p-5">

        <div className="flex gap-3">

          <input
            value={question}
            disabled={
              chat.isPending
            }
            onChange={e =>
              setQuestion(
                e.target
                  .value,
              )
            }
            onKeyDown={e => {
              if (
                e.key ===
                  'Enter' &&
                !e.shiftKey
              ) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Ask anything..."
            className="flex-1 rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary disabled:opacity-60"
          />

          <button
            onClick={
              sendMessage
            }
            disabled={
              chat.isPending
            }
            className="rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {chat.isPending
              ? 'Thinking...'
              : 'Send'}
          </button>

        </div>

      </div>

    </div>
  );
}