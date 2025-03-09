# Next.js Test Framework Demo Website

A modern web application built with Next.js 14, showcasing various test frameworks and best practices in web development. This project serves as a demonstration platform for implementing and comparing different testing methodologies. The application is deployed on Vercel and uses PostgreSQL for data management.

## Features

- Modern Stack: Built with Next.js 14 and React 19
- Authentication: Secure user authentication system using NextAuth.js
- Responsive Design: Mobile-first approach with a fully responsive layout
- UI Components: Utilises Tailwind CSS for modern, clean UI design
- Form Handling: Implements @tailwindcss/forms for consistent form styling
- Icons: Integrated with Heroicons for beautiful, scalable icons
- Database Integration: Fully functional PostgreSQL database hosted on Vercel
- Production Deployment: Successfully deployed and running on Vercel platform

## Tech Stack

- Framework: [Next.js 14](https://nextjs.org/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- Authentication: [NextAuth.js](https://next-auth.js.org/)
- Database: PostgreSQL with Vercel Postgres integration
- Icons: [Heroicons](https://heroicons.com/)
- Package Manager: [pnpm](https://pnpm.io/)
- Deployment: Vercel Platform with automatic deployments

## Database Features

The application includes a robust database system with:
- Customer management system
- Invoice tracking and processing
- Revenue analytics and reporting
- Secure data storage with Vercel Postgres
- Automated database seeding for testing
- Real-time data synchronization

## Deployment Status

The application is successfully deployed on Vercel with:
- Automatic deployments from main branch
- Environment variable configuration
- Database connection and management
- Serverless functions integration
- API routes implementation
- Static and dynamic page generation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BogdanFAndrei/NextJS_Website.git
   cd nextjs-dashboard
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables.

4. Run the development server:
   ```bash
   pnpm dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## Testing

This project serves as a demonstration platform for various testing frameworks and methodologies. Different testing approaches will be implemented and documented here.

## Authentication

The application includes a secure authentication system built with NextAuth.js. Users can:
- Log in securely
- Access protected routes
- Manage their session

## Responsive Design

The website is fully responsive and optimized for:
- Desktop devices
- Tablets
- Mobile phones

## UI Components and Theming

The application features a comprehensive set of modern UI components with dynamic theming support:

### Theme System
- Dynamic theme switching capability
- Customizable primary colors
- Consistent styling across all components

### Core Components
- **Navigation Bar**
  - Responsive layout
  - Dynamic highlighting for active routes
  - Smooth hover transitions
  - Theme-aware styling

- **Dashboard Components**
  - Revenue Chart with interactive hover effects
  - Theme-aware data visualization
  - Responsive card layouts
  - Dynamic loading states

- **Interactive Elements**
  - Theme-aware buttons with hover effects
  - Buttons with dynamic styling
  - Form inputs with consistent theming
  - Interactive pagination controls

### Styling Features
- Seamless theme transitions
- Consistent color palette across components
- Accessible color contrasts
- Responsive design patterns
- Modern hover and focus states

### Implementation
All UI components are built using:
- Tailwind CSS for styling
- CSS Modules for component-specific styles
- Context API for theme management
- Dynamic class generation for theme-specific styling

## Production Features

The application is running in production with:
- Optimized build performance
- Server-side rendering
- API route optimization
- Database connection pooling
- Automatic HTTPS encryption
- Asset optimization and caching

## Author

- Bogdan Andrei
- GitHub: [@BogdanFAndrei](https://github.com/BogdanFAndrei)

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform and database services
- Tailwind CSS team for the styling framework
