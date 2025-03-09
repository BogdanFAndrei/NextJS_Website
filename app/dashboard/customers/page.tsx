import { fetchAllCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import CustomerSort from '@/app/ui/customers/sort';
import { CreateCustomer } from '@/app/ui/customers/buttons';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
  };
}) {
  const query = searchParams?.query || '';
  const sort = searchParams?.sort || 'name-asc';
  const customers = await fetchAllCustomers(query, sort);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 md:mt-8 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Search placeholder="Search customers..." />
          <CreateCustomer />
        </div>
        <CustomerSort />
      </div>
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>
    </div>
  );
}

