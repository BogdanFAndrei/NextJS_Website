'use client';

import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';

export default function SignOutError({ error, resetErrorBoundary }: FallbackProps) {
  useEffect(() => {
    // Log the error to console with context
    console.error('Sign out error:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="rounded-md bg-red-50 p-2 text-red-700">
      <p className="text-sm">Failed to sign out. Please try again.</p>
      <button
        onClick={() => resetErrorBoundary()}
        className="mt-2 text-sm underline hover:text-red-800"
      >
        Retry
      </button>
    </div>
  );
} 