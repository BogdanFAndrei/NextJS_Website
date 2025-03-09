/**
 * Next.js Middleware Configuration
 * 
 * This middleware handles authentication and routing protection for the application.
 * It ensures that:
 * - Protected routes require authentication
 * - Static files are excluded from authentication checks
 * - Role-based access is enforced for dashboard and customer routes
 */

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Initialize authentication middleware
export default NextAuth(authConfig).auth;

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);

  // Add dynamic route handling headers
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // Return response with new headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure middleware path matching
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    // Exclude static files and API routes from authentication checks
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    
    // Protect dashboard routes (admin access)
    '/dashboard/:path*',
    
    // Protect customer portal routes
    '/customers/:path*',
    
    // Include auth-related routes
    '/api/auth/:path*',

    // Add new routes
    '/invoices/:path*',
  ],
}; 