'use client';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">

      <div className="rounded-2xl bg-muted px-4 py-3">

        <div className="flex gap-1">

          <span className="h-2 w-2 animate-bounce rounded-full bg-slate-500" />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
            style={{
              animationDelay:
                '0.15s',
            }}
          />

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-slate-500"
            style={{
              animationDelay:
                '0.3s',
            }}
          />

        </div>

      </div>

    </div>
  );
}