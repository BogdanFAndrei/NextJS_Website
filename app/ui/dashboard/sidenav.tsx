'use client';

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { SideNavSignOutButton } from '@/app/ui/sign-out-button';
import { useTheme } from '@/app/context/ThemeContext';

export default function SideNav() {
  const themeContext = useTheme();

  const sideNavStyle = {
    '--theme-primary': `var(--${themeContext.theme.primary})`,
    '--theme-background': `var(--${themeContext.theme.background})`
  } as React.CSSProperties;
  
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-[var(--theme-primary)] p-4 md:h-40"
        href="/"
        style={sideNavStyle}
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-[var(--theme-background)] md:block" style={sideNavStyle}></div>
        <SideNavSignOutButton />
      </div>
    </div>
  );
}
