/**
 * Customer Portal Page
 * 
 * This page serves as the main interface for authenticated customers.
 * It displays a personalized welcome message and provides access to customer-specific actions.
 */

import { fetchFilteredCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';
import { Card } from '@/app/ui/dashboard/cards';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Home | Customer Portal',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return notFound();
  }

  const customers = await fetchFilteredCustomers('');
  const customer = customers[0]; // Since we're filtering by email, there will only be one customer

  if (!customer) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Welcome, {customer.name}!</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          title="Total Invoices"
          value={customer.total_invoices.toString()}
          type="invoices"
        />
        
        <Card
          title="Pending Amount"
          value={customer.total_pending}
          type="pending"
        />
        
        <Card
          title="Total Paid"
          value={customer.total_paid}
          type="collected"
        />
      </div>

      <div className="mt-6">
        <div className="rounded-xl bg-gray-50 p-6">
          <div className="flex items-center gap-4">
            <Image
              src={customer.image_url}
              alt={`${customer.name}'s profile picture`}
              className="rounded-full"
              width={60}
              height={60}
            />
            <div>
              <h2 className="text-xl font-semibold">{customer.name}</h2>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 