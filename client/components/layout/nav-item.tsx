'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

import { useSidebar } from './sidebar-context';

interface NavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function NavItem({
  href,
  label,
  icon: Icon,
}: NavItemProps) {
  const pathname = usePathname();
  const { setOpen } = useSidebar();

  const active =
    pathname === href ||
    pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={clsx(
        `
        group
        relative

        flex
        h-11
        items-center
        gap-3

        rounded-xl

        px-3

        text-sm
        font-medium

        transition-all
        duration-200
        `,
        active
          ? `
            bg-accent
            text-foreground

            shadow-sm

            border
            border-border
          `
          : `
            border
            border-transparent

            text-muted-foreground

            hover:bg-accent/60
            hover:text-foreground
            hover:border-border
          `
      )}
    >
      {/* Active indicator */}

      <span
        className={clsx(
          `
          absolute
          left-0
          top-1/2

          h-6
          w-1

          -translate-y-1/2

          rounded-r-full

          transition-all
          duration-200
          `,
          active
            ? "bg-primary opacity-100"
            : "opacity-0 group-hover:opacity-40 bg-border"
        )}
      />

      {/* Icon */}

      <Icon
        size={18}
        className={clsx(
          "transition-colors duration-200",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />

      {/* Label */}

      <span className="truncate">
        {label}
      </span>
    </Link>
  );
}