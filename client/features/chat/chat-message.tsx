'use client';

import {
  Bot,
  CheckCircle2,
  FileText,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

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

interface Props {
  message: Message;
}

export function ChatMessage({
  message,
}: Props) {
  const isUser =
    message.role === 'user';

  return (
    <div
      className={`flex gap-4 ${
        isUser
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      {/* Avatar */}

      <div
        className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isUser
            ? 'bg-primary text-white'
            : 'bg-muted text-primary'
        }`}
      >
        {isUser ? (
          <User size={18} />
        ) : (
          <Bot size={18} />
        )}
      </div>

      {/* Content */}

      <div className="max-w-3xl flex-1">

        {/* Name */}

        <div className="mb-2 flex items-center gap-3">

          <p className="font-semibold">
            {isUser
              ? 'You'
              : 'SupportIQ AI'}
          </p>

          {!isUser &&
            message.confidence !==
              undefined && (
              <Badge variant="success">
                {Math.round(
                  message.confidence * 100,
                )}
                %
              </Badge>
            )}

        </div>

        {/* Message */}

        <div
          className={`rounded-2xl border px-5 py-4 ${
            isUser
              ? 'border-primary/30 bg-primary text-primary-foreground'
              : 'border-border bg-card'
          }`}
        >
          <p className="whitespace-pre-wrap leading-7">
            {message.message}
          </p>
        </div>

        {/* Sources */}

        {!isUser &&
          message.sources &&
          message.sources.length >
            0 && (
            <div className="mt-5">

              <div className="mb-2 flex items-center gap-2">

                <FileText
                  size={16}
                  className="text-muted-foreground"
                />

                <span className="text-sm font-medium text-muted-foreground">
                  Sources
                </span>

              </div>

              <div className="space-y-2">

                {message.sources
                  .slice(0, 3)
                  .map(
                    (
                      source,
                      index,
                    ) => (
                      <div
                        key={index}
                        className="rounded-xl border border-border bg-muted p-3 text-sm text-muted-foreground"
                      >
                        {source}
                      </div>
                    ),
                  )}

              </div>

            </div>
          )}

        {/* Ticket */}

        {!isUser &&
          message.shouldEscalate &&
          message.ticket && (
            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">

              <div className="mb-3 flex items-center gap-2">

                <CheckCircle2
                  size={18}
                  className="text-amber-500"
                />

                <p className="font-medium text-amber-500">
                  Support Ticket Created
                </p>

              </div>

              <div className="flex flex-wrap gap-2">

                <Badge variant="outline">
                  #{message.ticket.id.slice(
                    0,
                    8,
                  )}
                </Badge>

                <Badge variant="warning">
                  {message.ticket.status}
                </Badge>

                <Badge variant="secondary">
                  {message.ticket.priority}
                </Badge>

              </div>

            </div>
          )}

      </div>

    </div>
  );
}