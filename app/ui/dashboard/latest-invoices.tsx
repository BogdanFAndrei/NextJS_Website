'use client';

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { useTheme } from '@/app/context/ThemeContext';

export default function LatestInvoices({ latestInvoices }: { latestInvoices: any[] }) {
  const { theme } = useTheme();
  
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className={`flex grow flex-col justify-between rounded-xl bg-${theme.background} p-4 shadow-sm ring-1 ring-${theme.border}-100`}>
        <div className={`bg-${theme.background} px-6`}>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t border-gray-100': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div className="min-w-0">
                    <p className={`truncate text-sm font-semibold text-${theme.text}-900 md:text-base`}>
                      {invoice.name}
                    </p>
                    <p className={`hidden text-sm text-${theme.muted}-500 sm:block`}>
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p className={`${lusitana.className} truncate text-sm font-medium text-${theme.text}-700 md:text-base`}>
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className={`h-5 w-5 text-${theme.primary}-500`} />
          <h3 className={`ml-2 text-sm text-${theme.muted}-500`}>Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
