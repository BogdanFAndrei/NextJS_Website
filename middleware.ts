import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/customers/:path*',
    '/api/auth/:path*',
    '/invoices/:path*',
  ],
}; 