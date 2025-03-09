'use client';

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from '@/app/lib/actions';
import { useTheme } from '@/app/context/ThemeContext';

export function CreateInvoice() {
  const { theme } = useTheme();
  return (
    <Link
      href="/dashboard/invoices/create"
      className={`flex h-10 items-center rounded-lg bg-${theme.primary}-600 px-4 text-sm font-medium text-white transition-colors hover:bg-${theme.primary}-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${theme.primary}-600`}
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  const { theme } = useTheme();
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className={`rounded-md border p-2 hover:bg-${theme.primary}-100`}
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const { theme } = useTheme();
  return (
    <>
      <button type="submit" className={`rounded-md border p-2 hover:bg-${theme.primary}-100`}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}

export function DeleteInvoiceWithForm({ id }: { id: string }) {
  const { theme } = useTheme();
  
  return (
    <form action={async (formData) => {
      await deleteInvoice(id);
    }}>
      <button type="submit" className={`rounded-md border p-2 hover:bg-${theme.primary}-100`}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
