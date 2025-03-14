'use client';

import { PowerIcon } from '@heroicons/react/24/outline';
import { signOutAction } from '@/app/lib/actions';
import { useTheme } from '@/app/context/ThemeContext';

export function SignOutButton() {
  const { theme } = useTheme();
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-${theme.primary}-100"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
}

export function SideNavSignOutButton() {
  const { theme } = useTheme();
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-${theme.primary}-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <PowerIcon className="w-6" />
        <div className="hidden md:block">Sign Out</div>
      </button>
    </form>
  );
} 