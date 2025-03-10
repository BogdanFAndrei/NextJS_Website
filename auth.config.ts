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

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnCustomers = nextUrl.pathname.startsWith('/customers');
      
      if (isOnDashboard || isOnCustomers) {
        if (isLoggedIn) return true;
        return false;
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
        };
      },
    }),
  ],
} satisfies NextAuthConfig; 