'use client';

import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';
import { SideNavSignOutButton } from '@/app/ui/sign-out-button';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import SignOutError from '@/app/ui/sign-out-error';
import { ErrorBoundary } from 'react-error-boundary';
import { useTheme } from '@/app/context/ThemeContext';
import { Session } from 'next-auth';
import { FormattedCustomersTable } from '@/app/lib/definitions';

interface CustomerPortalProps {
  session: Session | null;
  customers: FormattedCustomersTable[];
}

export default function CustomerPortal({ session, customers }: CustomerPortalProps) {
  const { theme } = useTheme();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={`flex h-20 shrink-0 items-end rounded-lg bg-${theme.primary}-500 p-4 md:h-52`}>
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className={`${lusitana.className} text-xl text-white md:text-2xl`}>
              Welcome back, {session?.user?.name}!
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              className={`flex h-[48px] items-center justify-center gap-2 rounded-md bg-${theme.background} p-3 text-sm font-medium opacity-50 cursor-not-allowed`}
              disabled
            >
              <CreditCardIcon className={`w-6 text-${theme.text}-500`} />
              <span className="hidden md:block">Make Payment</span>
            </button>
            <ErrorBoundary FallbackComponent={SignOutError}>
              <SideNavSignOutButton />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex grow flex-col gap-4">
        <CustomersTable customers={customers} />
      </div>
    </main>
  );
} 