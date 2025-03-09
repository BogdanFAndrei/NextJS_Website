/**
 * Authentication Configuration for Next.js Application
 * This file contains the core authentication configuration using NextAuth.js
 * It handles role-based access control (RBAC) for admin and customer users
 */

import type { NextAuthConfig } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

interface ExtendedToken extends JWT {
  role?: 'admin' | 'customer';
}

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
    async session({ session, token }: { session: any; token: any }) {
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
      
      // If not logged in and trying to access protected routes
      if (!isLoggedIn && (isOnDashboard || isOnCustomerPage)) {
        return false; // Redirect to login
      }

      // If logged in and trying to access login page
      if (isLoggedIn && isOnLoginPage) {
        // Redirect based on role
        if (auth.user.role === 'customer') {
          return Response.redirect(new URL('/customers', nextUrl));
        }
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Role-based access control
      if (isLoggedIn) {
        // Customer trying to access admin dashboard
        if (auth.user.role === 'customer' && isOnDashboard) {
          return Response.redirect(new URL('/customers', nextUrl));
        }
        // Admin trying to access customer pages
        if (auth.user.role === 'admin' && isOnCustomerPage) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }

      return true;
    },
  },
  providers: [], // configured in auth.ts
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig; 