'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';

const sortOptions = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Email (A-Z)', value: 'email-asc' },
  { label: 'Email (Z-A)', value: 'email-desc' },
];

export default function CustomerSort() {
  const { theme } = useTheme();
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSort(sortValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sortValue);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      className={`rounded-md border border-${theme.border}-200 py-2 px-3 text-sm outline-2 placeholder:text-${theme.muted}-500 focus:border-${theme.primary}-500 focus:ring-${theme.primary}-500`}
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