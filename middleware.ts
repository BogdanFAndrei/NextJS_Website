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

// Initialize authentication middleware
export default NextAuth(authConfig).auth;

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
  ],
}; 