'use client';

import { useRouter } from 'next/navigation';

import {
  Bell,
  LogOut,
  Settings,
  Shield,
  User,
} from 'lucide-react';

import { toast } from 'sonner';

import { useAuth } from '@/features/auth/use-auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  async function handleLogout() {
    await logout();

    toast.success('Logged out successfully');

    router.replace('/');
  }

  const initials =
    user?.name
      ?.split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase() ?? '?';

  return (
    <DropdownMenu>

      <DropdownMenuTrigger asChild>

        <button
          className="
          flex
          items-center
          gap-3

          rounded-2xl

          border
          border-border

          bg-card

          px-3
          py-2

          transition-all
          duration-200

          hover:border-primary/20
          hover:bg-accent
          "
        >

          <div
            className="
            flex

            h-10
            w-10

            items-center
            justify-center

            rounded-full

            bg-primary

            text-sm
            font-semibold

            text-primary-foreground
            "
          >

            {initials}

          </div>

          <div className="hidden text-left xl:block">

            <p className="text-sm font-medium">

              {user?.name}

            </p>

            <p className="text-xs capitalize text-muted-foreground">

              {user?.role?.toLowerCase()}

            </p>

          </div>

        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72"
      >

        {/* User Header */}

        <DropdownMenuLabel className="p-4">

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full

              bg-primary

              text-base
              font-semibold

              text-primary-foreground
              "
            >

              {initials}

            </div>

            <div>

              <p className="font-semibold">

                {user?.name}

              </p>

              <p className="text-sm text-muted-foreground">

                {user?.email}

              </p>

            </div>

          </div>

        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() =>
            router.push('/profile')
          }
        >

          <User size={17} />

          Profile

        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.push(
              user?.role === 'ADMIN'
                ? '/settings'
                : '/profile',
            )
          }
        >

          <Settings size={17} />

          Settings

        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            router.push('/notifications')
          }
        >

          <Bell size={17} />

          Notifications

        </DropdownMenuItem>

        <DropdownMenuItem disabled>

          <Shield size={17} />

          {user?.role}

        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
        >

          <LogOut size={17} />

          Logout

        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}