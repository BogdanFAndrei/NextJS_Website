/**
 * NextAuth.js Authentication Implementation
 * 
 * This file implements the core authentication logic using NextAuth.js.
 * It provides:
 * - User authentication with email/password
 * - Role-based user management (admin/customer)
 * - Database integration for user verification
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

// Initialize database connection
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/**
 * Fetches user data from the database based on email
 * Checks both admin and customer tables
 * 
 * @param email - The email address to look up
 * @returns User object if found, undefined otherwise
 */
async function getUser(email: string): Promise<User | undefined> {
  try {
    // First try to find in users table (admins)
    const adminUser = await sql<User[]>`SELECT *, 'admin' as role FROM users WHERE email=${email}`;
    if (adminUser[0]) return adminUser[0];
    
    // If not found, try customers table
    const customerUser = await sql<User[]>`
      SELECT 
        id,
        name,
        email,
        password,
        'customer' as role
      FROM customers 
      WHERE email=${email}
    `;
    return customerUser[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// Configure NextAuth with credentials provider
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate credentials format
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // Fetch user and verify password
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
}); 