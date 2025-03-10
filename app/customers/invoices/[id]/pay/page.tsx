import { fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Make Payment | Customer Portal',
};

export default async function Page({ params }: { params: { id: string } }) {
  const invoice = await fetchInvoiceById(params.id);

  if (!invoice) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/customers/invoices">
          <Button className="flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Invoices
          </Button>
        </Link>
        <h1 className={`${lusitana.className} text-2xl`}>Make Payment</h1>
      </div>

      <div className="rounded-xl bg-gray-50 p-8 max-w-xl">
        <div className="space-y-4">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Payment Feature Coming Soon!</h2>
            <p className="text-gray-600">
              We're working hard to bring you a secure and convenient payment system.
              This feature will be available soon.
            </p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Invoice Amount:</span>
              <span className="text-gray-900">${(invoice.amount / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className="capitalize text-gray-900">{invoice.status}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 