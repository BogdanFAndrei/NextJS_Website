'use client';

import {
  UserCircleIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTheme } from '@/app/context/ThemeContext';

const links = [
  { name: 'Home', href: '/customers', icon: HomeIcon },
  { name: 'Profile', href: '/customers/profile', icon: UserCircleIcon },
  {
    name: 'Invoices',
    href: '/customers/invoices',
    icon: DocumentDuplicateIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 transition-all duration-200 ease-in-out',
              pathname === link.href 
                ? `bg-${theme.primary}-200` 
                : `hover:bg-${theme.primary}-100 hover:scale-[1.02]`
            )}
          >
            <LinkIcon className={clsx('w-6 text-black')} />
            <p className="hidden md:block text-black">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
} 