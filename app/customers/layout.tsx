import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function CustomersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  // Verify the user is logged in and has customer role
  if (!session?.user || session.user.role !== 'customer') {
    redirect('/login');
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
      </div>
    </div>
  );
} 