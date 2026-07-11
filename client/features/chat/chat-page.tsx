'use client';

import { useEffect, useRef, useState } from 'react';

import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { useChat } from './use-chat';

import {
  Bot,
  BrainCircuit,
  Database,
  FileText,
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  message: string;

  confidence?: number;

  shouldEscalate?: boolean;

  ticket?: {
    id: string;
    status: string;
    priority: string;
  };

  sources?: string[];
}

export function ChatPage() {
  const [messages, setMessages] =
    useState<Message[]>([]);

  const chatMutation =
    useChat();

  const { isPending } =
    chatMutation;

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isPending]);

  async function handleSend(
    text: string,
  ) {
    setMessages(prev => [
      ...prev,
      {
        role: 'user',
        message: text,
      },
    ]);

    try {
      const response =
        await chatMutation.mutateAsync({
          question: text,
        });

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          message:
  response.data.answer,

confidence:
  response.data.confidence,

shouldEscalate:
  response.data.shouldEscalate,

ticket:
  response.data.ticket,

sources:
  response.data.sources.map(
    source => source.document,
  ),
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          message:
            'Something went wrong. Please try again.',
        },
      ]);
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-semibold">
          AI Assistant
        </h1>

        <p className="mt-1 text-muted-foreground">
          Ask questions about your knowledge base.
        </p>

      </div>

      {/* Workspace */}

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">

            {/* Conversation */}

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

        {/* Header */}

        <div className="border-b border-border px-6 py-4">

          <h2 className="font-semibold">
            Conversation
          </h2>

        </div>

        {/* Messages */}

        <div className="flex h-[68vh] flex-col">

          <div className="flex-1 space-y-8 overflow-y-auto p-6">

            {messages.length === 0 ? (

              <div className="flex h-full flex-col items-center justify-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">

                  <Bot
                    size={30}
                    className="text-primary"
                  />

                </div>

                <h2 className="mt-6 text-2xl font-semibold">

                  How can I help today?

                </h2>

                <p className="mt-2 max-w-md text-center text-muted-foreground">

                  Ask anything about your uploaded
                  documents, company knowledge base,
                  support process or policies.

                </p>

                <div className="mt-10 grid w-full max-w-2xl gap-3 md:grid-cols-2">

                  <button className="rounded-2xl border border-border bg-background p-4 text-left transition hover:bg-muted">

                    <p className="font-medium">
                      Summarize uploaded documents
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Generate a concise summary.
                    </p>

                  </button>

                  <button className="rounded-2xl border border-border bg-background p-4 text-left transition hover:bg-muted">

                    <p className="font-medium">
                      Search company policies
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Retrieve answers using AI.
                    </p>

                  </button>

                  <button className="rounded-2xl border border-border bg-background p-4 text-left transition hover:bg-muted">

                    <p className="font-medium">
                      Explain this document
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Break down complex sections.
                    </p>

                  </button>

                  <button className="rounded-2xl border border-border bg-background p-4 text-left transition hover:bg-muted">

                    <p className="font-medium">
                      Create a support ticket
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Escalate when AI is not confident.
                    </p>

                  </button>

                </div>

              </div>

            ) : (

              <>
                {messages.map(
                  (message, index) => (
                    <ChatMessage
                      key={index}
                      message={message}
                    />
                  ),
                )}

                {isPending && (

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">

                      <Bot
                        size={18}
                        className="text-primary"
                      />

                    </div>

                    <div className="rounded-2xl border border-border bg-background px-5 py-4">

                      <div className="flex gap-2">

                        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-primary"
                          style={{
                            animationDelay:
                              '.15s',
                          }}
                        />

                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-primary"
                          style={{
                            animationDelay:
                              '.3s',
                          }}
                        />

                      </div>

                    </div>

                  </div>

                )}

                <div ref={bottomRef} />

              </>

            )}

          </div>

          {/* Input */}

          <div className="border-t border-border p-4">

            <ChatInput
              onSend={handleSend}
              isLoading={isPending}
            />

          </div>

        </div>

      </div>

            {/* AI Insights */}

      <aside className="space-y-4">

        <div className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-sm">

          <h3 className="mb-6 text-lg font-semibold">
            AI Insights
          </h3>

          <div className="space-y-5">

            {/* Confidence */}

            <div className="flex items-center justify-between rounded-2xl bg-background p-4">

              <div className="flex items-center gap-3">

                <BrainCircuit
                  size={18}
                  className="text-primary"
                />

                <div>

                  <p className="text-sm font-medium">
                    Confidence
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Latest response
                  </p>

                </div>

              </div>

              <span className="font-semibold text-primary">

                {messages.length &&
                messages[messages.length - 1]
                  .confidence !== undefined
                  ? `${Math.round(
                      (messages[
                        messages.length - 1
                      ].confidence ?? 0) * 100,
                    )}%`
                  : '--'}

              </span>

            </div>

            {/* Sources */}

            <div className="flex items-center justify-between rounded-2xl bg-background p-4">

              <div className="flex items-center gap-3">

                <FileText
                  size={18}
                  className="text-primary"
                />

                <div>

                  <p className="text-sm font-medium">
                    Sources
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Retrieved chunks
                  </p>

                </div>

              </div>

              <span className="font-semibold">

                {messages.length &&
                messages[messages.length - 1]
                  .sources
                  ? messages[
                      messages.length - 1
                    ].sources!.length
                  : '--'}

              </span>

            </div>

            {/* Vector DB */}

            <div className="flex items-center justify-between rounded-2xl bg-background p-4">

              <div className="flex items-center gap-3">

                <Database
                  size={18}
                  className="text-primary"
                />

                <div>

                  <p className="text-sm font-medium">
                    Vector DB
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Active
                  </p>

                </div>

              </div>

              <span className="font-semibold">
                ChromaDB
              </span>

            </div>

          </div>

          <div className="mt-8 rounded-2xl border border-border bg-background p-4">

            <p className="text-sm font-medium">
              Tip
            </p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">

              SupportIQ automatically creates
              a ticket whenever AI confidence
              falls below your configured
              threshold.

            </p>

          </div>

        </div>

      </aside>

    </div>

  </div>
  );
}