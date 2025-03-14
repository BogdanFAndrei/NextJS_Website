'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTheme } from '@/app/context/ThemeContext';

export function CreateCustomer() {
  const { theme } = useTheme();
  return (
    <Link
      href="/dashboard/customers/create"
      className={`flex h-10 items-center rounded-lg bg-${theme.primary}-600 px-4 text-sm font-medium text-white transition-colors hover:bg-${theme.primary}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${theme.primary}-600`}
    >
      <span className="hidden md:block">Add Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
} 