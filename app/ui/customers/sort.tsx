'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';

export default function CustomerSort() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(sortBy: string) {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sort', sortBy);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative">
      <select
        className={`block rounded-md border border-gray-200 px-4 py-2 text-sm outline-2 outline-offset-2 outline-${theme.primary}-500`}
        onChange={(e) => handleSort(e.target.value)}
        value={searchParams?.get('sort') || 'name-asc'}
      >
        <optgroup label="Name">
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </optgroup>
        <optgroup label="Invoices">
          <option value="invoices-high">Most Invoices</option>
          <option value="invoices-low">Least Invoices</option>
        </optgroup>
        <optgroup label="Money Owed">
          <option value="pending-high">Highest Pending Amount</option>
          <option value="pending-low">Lowest Pending Amount</option>
        </optgroup>
        <optgroup label="Money Paid">
          <option value="paid-high">Highest Paid Amount</option>
          <option value="paid-low">Lowest Paid Amount</option>
        </optgroup>
      </select>
    </div>
  );
}