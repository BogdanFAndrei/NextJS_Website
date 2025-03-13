import { fetchFilteredInvoices } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import Table from '@/app/ui/invoices/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import Search from '@/app/ui/search';

export const metadata: Metadata = {
  title: 'Invoices | Customer Portal',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Your Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
      </div>
      <div className="mt-4 flex grow flex-col gap-4">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
} 