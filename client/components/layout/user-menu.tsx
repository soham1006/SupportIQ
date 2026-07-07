'use client';

import {
  Bell,
  LogOut,
  Settings,
  User,
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <button className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2 transition hover:bg-muted">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-semibold text-white">

            S

          </div>

          <div className="hidden text-left xl:block">

            <p className="text-sm font-medium">
              Soham
            </p>

            <p className="text-xs text-muted-foreground">
              Admin
            </p>

          </div>

        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56"
      >

        <DropdownMenuItem>

          <User size={16} />

          <span>Profile</span>

        </DropdownMenuItem>

        <DropdownMenuItem>

          <Settings size={16} />

          <span>Settings</span>

        </DropdownMenuItem>

        <DropdownMenuItem>

          <Bell size={16} />

          <span>Notifications</span>

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() =>
            console.log(
              'Logout',
            )
          }
        >

          <LogOut size={16} />

          <span>Logout</span>

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}