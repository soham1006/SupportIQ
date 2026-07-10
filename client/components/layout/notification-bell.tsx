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
  const { data } = useUnreadCount();

  const [open, setOpen] = useState(false);

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
          setOpen((prev) => !prev)
        }
        aria-label="Notifications"
        className="
          relative

          flex
          h-11
          w-11

          items-center
          justify-center

          rounded-2xl

          border
          border-border

          bg-card

          shadow-sm

          transition-all
          duration-200

          hover:bg-accent
          hover:border-primary/20

          active:scale-95
        "
      >
        <Bell
          size={18}
          className="
            text-muted-foreground

            transition-colors
            duration-200

            group-hover:text-primary
          "
        />

        {count > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1

              flex
              h-5
              min-w-[20px]

              items-center
              justify-center

              rounded-full

              border-2
              border-background

              bg-primary

              px-1

              text-[10px]
              font-semibold

              text-primary-foreground
            "
          >
            {count > 99
              ? '99+'
              : count}
          </span>
        )}
      </button>

      {open && <NotificationDropdown />}
    </div>
  );
}