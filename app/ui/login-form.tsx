'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useTheme } from '@/app/context/ThemeContext';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );
  const { theme } = useTheme();

  return (
    <form action={formAction} className="space-y-3">
      <div className={`flex-1 rounded-lg bg-${theme.background} px-6 pb-4 pt-8 shadow-md ring-1 ring-${theme.border}-100`}>
        <h1 className={`${lusitana.className} mb-3 text-2xl text-${theme.text}-900`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-${theme.text}-900`}
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-${theme.border}-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-${theme.muted}-500 focus:border-${theme.primary}-500 focus:ring-${theme.primary}-500`}
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-${theme.muted}-500 peer-focus:text-${theme.primary}-500`} />
            </div>
          </div>
          <div className="mt-4">
            <label
              className={`mb-3 mt-5 block text-xs font-medium text-${theme.text}-900`}
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-${theme.border}-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-${theme.muted}-500 focus:border-${theme.primary}-500 focus:ring-${theme.primary}-500`}
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className={`pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-${theme.muted}-500 peer-focus:text-${theme.primary}-500`} />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className={`h-5 w-5 text-${theme.error}-500`} />
              <p className={`text-sm text-${theme.error}-500`}>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
