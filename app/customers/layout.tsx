import CustomerNav from '@/app/ui/customers/nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Customer Portal',
    default: 'Customer Portal',
  },
  description: 'View your invoices and account information.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <CustomerNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
} 