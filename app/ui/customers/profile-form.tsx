'use client';

import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { updateCustomerProfile } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export default function ProfileForm({ customer }: { customer: any }) {
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const updateProfileWithId = updateCustomerProfile.bind(null, customer.id);

  async function handleSubmit(formData: FormData) {
    const result = await updateProfileWithId(formData);
    
    if (result.message.includes('successfully')) {
      setMessageType('success');
    } else {
      setMessageType('error');
    }
    setMessage(result.message);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }

  return (
    <div className="rounded-xl bg-gray-50 p-6 col-span-2">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={customer.image_url}
          alt={`${customer.name}'s profile picture`}
          className="rounded-full"
          width={60}
          height={60}
        />
        <div>
          <h2 className="text-xl font-semibold">{customer.name}</h2>
          <p className="text-sm text-gray-500">{customer.email}</p>
        </div>
      </div>

      <form action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={customer.name}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={customer.email}
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <SubmitButton />
          {message && (
            <p className={clsx(
              'text-sm',
              {
                'text-green-600': messageType === 'success',
                'text-red-600': messageType === 'error',
              }
            )}>
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update Profile'}
    </Button>
  );
} 