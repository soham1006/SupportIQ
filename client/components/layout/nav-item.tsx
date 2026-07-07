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
  const pathname =
    usePathname();

  const { setOpen } =
    useSidebar();

  const active =
    pathname === href;

  return (
    <Link
      href={href}
      onClick={() =>
        setOpen(false)
      }
      className={clsx(
        'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-all duration-200',
        active
          ? 'bg-emerald-500/10 text-emerald-400'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon size={18} />

      <span>{label}</span>

    </Link>
  );
}