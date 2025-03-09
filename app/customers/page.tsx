/**
 * Customer Portal Page
 * 
 * This page serves as the main interface for authenticated customers.
 * It displays a personalized welcome message and provides access to customer-specific actions.
 */

import { Suspense } from 'react';
import { Metadata } from 'next';
import CustomerPortal from '@/app/ui/customers/portal';
import { auth } from '@/auth';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Portal',
};

export default async function Page() {
  const session = await auth();
  const customers = await fetchFilteredCustomers('');

  return (
    <Suspense>
      <CustomerPortal 
        session={session}
        customers={customers}
      />
    </Suspense>
  );
} 