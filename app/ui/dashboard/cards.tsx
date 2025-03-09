'use client';

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { useTheme } from '@/app/context/ThemeContext';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <>
      {/* NOTE: Uncomment this code in Chapter 9 */}

      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> 
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];
  const { theme } = useTheme();

  const getCardColor = (type: string) => {
    switch (type) {
      case 'collected':
        return theme.success;
      case 'pending':
        return theme.warning;
      case 'invoices':
        return theme.info;
      case 'customers':
        return theme.primary;
      default:
        return theme.secondary;
    }
  };

  const cardColor = getCardColor(type);

  return (
    <div className={`rounded-xl bg-${theme.background} p-2 shadow-sm ring-1 ring-${theme.border}-100`}>
      <div className="flex p-4">
        {Icon ? (
          <Icon className={`h-5 w-5 text-${cardColor}-500`} />
        ) : null}
        <h3 className={`ml-2 text-sm font-medium text-${theme.text}-500`}>
          {title}
        </h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-${theme.background} px-4 py-8 text-center text-2xl text-${theme.text}-900`}
      >
        {value}
      </p>
    </div>
  );
}
