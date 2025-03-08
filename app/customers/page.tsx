import { auth } from '@/auth';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { Metadata } from 'next';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Customer Portal',
};

export default async function CustomerPortalPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const session = await auth();
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <div className="w-full">
          <div className="w-full">
            <h1 className={`${lusitana.className} text-xl text-white md:text-2xl`}>
              Welcome back, {session?.user?.name}!
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4">
        <Search placeholder="Search..." />
        <Suspense>
          <CustomersTable customers={customers} />
        </Suspense>
      </div>
    </main>
  );
} 