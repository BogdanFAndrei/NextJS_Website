'use client';

import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { updateCustomerPassword } from '@/app/lib/actions';
import { useState } from 'react';
import clsx from 'clsx';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function PasswordForm({ customerId }: { customerId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const updatePasswordWithId = updateCustomerPassword.bind(null, customerId);

  async function handleSubmit(formData: FormData) {
    const result = await updatePasswordWithId(formData);
    
    if (result.message.includes('successfully')) {
      setMessageType('success');
      setShowForm(false); // Hide form on success
      // Clear form
      const form = document.getElementById('password-form') as HTMLFormElement;
      if (form) form.reset();
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
    <div className="mt-6 rounded-xl bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Password Settings</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Change Password'}
        </Button>
      </div>

      {showForm && (
        <>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Must be at least 6 characters long</li>
              <li>Must be different from your current password</li>
              <li>New password and confirmation must match</li>
            </ul>
          </div>

          <form id="password-form" action={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                required
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                minLength={6}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                minLength={6}
                className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>

            <div className="flex items-center gap-4">
              <SubmitButton />
              {message && (
                <div className="flex items-center gap-2">
                  {messageType === 'error' && (
                    <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
                  )}
                  <p className={clsx(
                    'text-sm',
                    {
                      'text-green-600': messageType === 'success',
                      'text-red-600': messageType === 'error',
                    }
                  )}>
                    {message}
                  </p>
                </div>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update Password'}
    </Button>
  );
} 