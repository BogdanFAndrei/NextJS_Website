'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useTheme } from '@/app/context/ThemeContext';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { theme } = useTheme();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className={`peer block w-full rounded-md border border-${theme.border}-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-${theme.muted}-500 focus:border-${theme.primary}-500 focus:ring-${theme.primary}-500`}
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className={`absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-${theme.muted}-500 peer-focus:text-${theme.primary}-500`} />
    </div>
  );
}