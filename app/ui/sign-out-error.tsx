'use client';

import { useEffect } from 'react';

export default function SignOutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        onClick={() => reset()}
        className="mt-2 text-sm underline hover:text-red-800"
      >
        Retry
      </button>
    </div>
  );
} 