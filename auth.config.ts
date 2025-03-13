/**
 * Authentication Configuration for Next.js Application
 * This file contains the core authentication configuration using NextAuth.js
 * It handles role-based access control (RBAC) for admin and customer users
 */

import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

type UserRole = 'customer' | 'admin';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/', // Set default sign-out page to home
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as UserRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnCustomers = nextUrl.pathname.startsWith('/customers');
      const isOnLoginPage = nextUrl.pathname === '/login';
      
      // If not logged in and trying to access protected routes
      if (!isLoggedIn && (isOnDashboard || isOnCustomers)) {
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
        if (auth.user.role === 'admin' && isOnCustomers) {
          return Response.redirect(new URL('/dashboard', nextUrl));
        }
      }

      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await sql`
          SELECT * FROM users WHERE email = ${email}
        `;

        if (!user.rows[0]) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.rows[0].password
        );

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user.rows[0].id,
          email: user.rows[0].email,
          name: user.rows[0].name,
          role: (user.rows[0].role || 'customer') as UserRole, // Default to customer if no role specified
        };
      },
    }),
  ],
} satisfies NextAuthConfig; 