'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/customers/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOutAction } from '@/app/lib/auth-actions';
import { useTheme } from '@/app/context/ThemeContext';

export default function CustomerNav() {
  const { theme } = useTheme();
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className={`mb-2 flex h-20 items-end justify-start rounded-md bg-${theme.primary}-600 p-4 md:h-40 transition-colors duration-200`}
        href="/customers"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={signOutAction}>
          <button className={`flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-${theme.primary}-100 hover:text-${theme.primary}-600 transition-colors duration-200 md:flex-none md:justify-start md:p-2 md:px-3`}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
} 