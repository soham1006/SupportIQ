'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ConfidenceBadge } from './confidence-badge';
import { EscalationBanner } from './escalation-banner';
import { SourcePanel } from './source-panel';

interface Props {
  message: any;
}

export function MessageBubble({
  message,
}: Props) {
  const {
    role,
    content,
    confidence,
    sources,
    shouldEscalate,
    ticket,
  } = message;

  const isUser =
    role === 'USER';

  return (
    <div
      className={`flex ${
        isUser
          ? 'justify-end'
          : 'justify-start'
      }`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-5 py-4 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">
            {content}
          </p>
        ) : (
          <article className="prose max-w-none dark:prose-invert">

            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
              ]}
            >
              {content}
            </ReactMarkdown>

          </article>
        )}

        {!isUser && (
          <div className="mt-5 space-y-4">

            {typeof confidence ===
              'number' && (
              <ConfidenceBadge
                confidence={
                  confidence
                }
              />
            )}

            <SourcePanel
              sources={
                sources ?? []
              }
            />

            <EscalationBanner
              show={
                shouldEscalate
              }
              ticket={ticket}
            />

          </div>
        )}

      </div>
    </div>
  );
}