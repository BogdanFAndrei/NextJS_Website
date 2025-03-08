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
      
      // Allow access to root page and login page without authentication
      if (isOnRootPage || isOnLoginPage) return true;

      // If user is logged in and tries to access login page, redirect based on role
      if (isLoggedIn && isOnLoginPage) {
        return auth?.user?.role === 'customer'
          ? Response.redirect(new URL('/customers', nextUrl))
          : Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Handle customer routes
      if (isOnCustomerPage) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        // Allow customers to access their pages
        if (auth?.user?.role === 'customer') {
          return true;
        }
        // Redirect admins to dashboard
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // Handle dashboard routes
      if (isOnDashboard) {
        if (!isLoggedIn) {
          return Response.redirect(new URL('/login', nextUrl));
        }
        // Allow admins to access dashboard
        if (auth?.user?.role === 'admin') {
          return true;
        }
        // Redirect customers to their page
        return Response.redirect(new URL('/customers', nextUrl));
      }

      // Default allow access to other routes
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig; 