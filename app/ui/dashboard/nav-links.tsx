'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useTheme } from '@/app/context/ThemeContext';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const themeContext = useTheme();

  const linkStyle = {
    '--theme-primary': `var(--${themeContext.theme.primary})`,
    '--theme-hover': `var(--${themeContext.theme.hover})`,
    '--theme-background': `var(--${themeContext.theme.background})`
  } as React.CSSProperties;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            style={linkStyle}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3',
              'transition-colors duration-200',
              'hover:bg-[var(--theme-hover)] hover:text-[var(--theme-primary)]',
              {
                'bg-[var(--theme-primary)]': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
