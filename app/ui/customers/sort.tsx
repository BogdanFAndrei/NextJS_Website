'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'pending-high', label: 'Highest Pending' },
  { value: 'pending-low', label: 'Lowest Pending' },
  { value: 'invoices-high', label: 'Most Invoices' },
  { value: 'invoices-low', label: 'Least Invoices' },
  { value: 'paid-high', label: 'Highest Paid' },
  { value: 'paid-low', label: 'Lowest Paid' },
];

export default function CustomerSort() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSort(sortValue: string) {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sortValue);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className="rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
      onChange={(e) => handleSort(e.target.value)}
      value={searchParams.get('sort') || 'name-asc'}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
} 