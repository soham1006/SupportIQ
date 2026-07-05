'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Bell } from 'lucide-react';

import { useUnreadCount } from '@/features/notifications/use-unread-count';

import { NotificationDropdown } from './notification-dropdown';

export function NotificationBell() {
  const {
    data,
  } = useUnreadCount();

  const [open, setOpen] =
    useState(false);

  const wrapperRef =
    useRef<HTMLDivElement>(null);

  const count =
    data?.data.count ?? 0;

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <button
        onClick={() =>
          setOpen(prev => !prev)
        }
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition hover:bg-muted"
      >
        <Bell size={18} />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
            {count > 99
              ? '99+'
              : count}
          </span>
        )}
      </button>

      {open && (
        <NotificationDropdown />
      )}
    </div>
  );
}