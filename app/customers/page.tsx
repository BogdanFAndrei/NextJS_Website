/**
 * Customer Portal Page
 * 
 * This page serves as the main interface for authenticated customers.
 * It displays a personalized welcome message and provides access to customer-specific actions.
 */

import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';

export const metadata: Metadata = {
  title: 'Customer Portal',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const customers = await fetchFilteredCustomers('');

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Customer Portal</h1>
      </div>
      <div className="mt-4 flex grow flex-col gap-4">
        <CustomersTable customers={customers} />
      </div>
    </main>
  );
} 