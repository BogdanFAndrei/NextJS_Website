/**
 * Customer Portal Page
 * 
 * This page serves as the main interface for authenticated customers.
 * It displays a personalized welcome message and provides access to customer-specific actions.
 * Features:
 * - Personalized welcome message with customer name
 * - Actions dropdown menu with sign out functionality
 * - Future payment integration (currently disabled)
 * - Customer-specific data display
 */

import { signOut } from '@/auth';
import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import {
  ChevronDownIcon,
  CreditCardIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Portal',
};

export default async function CustomerPortalPage() {
  // Get authenticated session and customer data
  const session = await auth();
  const customers = await fetchFilteredCustomers('');

  return (
    <main className="flex min-h-screen flex-col p-6">
      {/* Header Section with Welcome Message and Actions */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="w-full flex justify-between items-center">
          {/* Welcome Message */}
          <div>
            <h1 className={`${lusitana.className} text-xl text-white md:text-2xl`}>
              Welcome back, {session?.user?.name}!
            </h1>
          </div>
          
          {/* Actions Dropdown Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
              Actions
              <ChevronDownIcon className="w-5" />
            </button>
            {/* Dropdown Content */}
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible hover:opacity-100 hover:visible transition-all duration-100">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {/* Payment Button (Disabled) */}
                <button
                  className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 opacity-50 cursor-not-allowed"
                  role="menuitem"
                  disabled
                >
                  <CreditCardIcon className="w-5" />
                  Make Payment
                </button>
                {/* Sign Out Form */}
                <form
                  action={async () => {
                    'use server';
                    await signOut({ redirectTo: '/' });
                  }}
                >
                  <button
                    className="flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    <PowerIcon className="w-5" />
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Data Section */}
      <div className="mt-4 flex grow flex-col gap-4">
        <Suspense>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </main>
  );
} 