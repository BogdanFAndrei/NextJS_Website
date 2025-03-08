/**
 * Customer Portal Page
 * 
 * This page serves as the main interface for authenticated customers.
 * It displays a personalized welcome message and provides access to customer-specific actions.
 */

import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import {  SignOutButton } from '@/app/ui/sign-out-button';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import SignOutError from '@/app/ui/sign-out-error';
import { ErrorBoundary } from 'react-error-boundary';


export const metadata: Metadata = {
  title: 'Portal',
};

export default async function CustomerPortalPage() {
  const session = await auth();
  const customers = await fetchFilteredCustomers('');

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="w-full flex justify-between items-center">
          <div>
            <h1 className={`${lusitana.className} text-xl text-white md:text-2xl`}>
              Welcome back, {session?.user?.name}!
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium opacity-50 cursor-not-allowed"
              disabled
            >
              <CreditCardIcon className="w-6" />
              <span className="hidden md:block">Make Payment</span>
            </button>
            <ErrorBoundary FallbackComponent={SignOutError}>
              <SignOutButton />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex grow flex-col gap-4">
        <Suspense>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </main>
  );
} 