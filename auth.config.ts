/**
 * Authentication Configuration for Next.js Application
 * This file contains the core authentication configuration using NextAuth.js
 * It handles role-based access control (RBAC) for admin and customer users
 */

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnCustomerPage = nextUrl.pathname.startsWith('/customers');
      const isOnLoginPage = nextUrl.pathname === '/login';
      const isOnRootPage = nextUrl.pathname === '/';
      
      // Public routes - allow access without authentication
      if (isOnRootPage || isOnLoginPage) return true;

      // Redirect authenticated users from login page based on their role
      if (isLoggedIn && isOnLoginPage) {
        return auth?.user?.role === 'customer'
          ? Response.redirect(new URL('/customers', nextUrl))
          : Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Customer portal access control
      if (isOnCustomerPage) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        // Only allow customers to access their portal
        if (auth?.user?.role === 'customer') {
          return true;
        }
        // Redirect admins to their dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Admin dashboard access control
      if (isOnDashboard) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        // Only allow admins to access dashboard
        if (auth?.user?.role === 'admin') {
          return true;
        }
        // Redirect customers to their portal
        return Response.redirect(new URL('/customers', nextUrl));
      }

      // Default to allowing access for other routes
      return true;
    },
  },
  providers: [], // Providers are configured in auth.ts
} satisfies NextAuthConfig; 