import { fetchFilteredCustomers } from '@/app/lib/data';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import ProfileForm from '@/app/ui/customers/profile-form';
import PasswordForm from '@/app/ui/customers/password-form';

export const metadata: Metadata = {
  title: 'Profile | Customer Portal',
};

export default async function Page() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return notFound();
  }

  const customers = await fetchFilteredCustomers('');
  const customer = customers[0]; // Since we're filtering by email, there will only be one customer

  if (!customer) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col p-6">
      <h1 className={`${lusitana.className} mb-8 text-2xl`}>Your Profile</h1>
      <div className="max-w-xl">
        <ProfileForm customer={customer} />
        <PasswordForm customerId={customer.id} />
      </div>
    </main>
  );
} 