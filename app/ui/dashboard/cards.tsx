'use client';

import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { useTheme } from '@/app/context/ThemeContext';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default function CardWrapper({
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
}: {
  numberOfInvoices: number;
  numberOfCustomers: number;
  totalPaidInvoices: string;
  totalPendingInvoices: string;
}) {
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

  const getCardClasses = (type: string) => {
    switch (type) {
      case 'collected':
        return {
          icon: 'text-green-500',
          text: 'text-gray-500',
          value: 'text-gray-900'
        };
      case 'pending':
        return {
          icon: 'text-yellow-500',
          text: 'text-gray-500',
          value: 'text-gray-900'
        };
      case 'invoices':
        return {
          icon: 'text-blue-500',
          text: 'text-gray-500',
          value: 'text-gray-900'
        };
      case 'customers':
        return {
          icon: 'text-blue-500',
          text: 'text-gray-500',
          value: 'text-gray-900'
        };
      default:
        return {
          icon: 'text-gray-500',
          text: 'text-gray-500',
          value: 'text-gray-900'
        };
    }
  };

  const classes = getCardClasses(type);

  return (
    <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-gray-100">
      <div className="flex p-4">
        {Icon ? (
          <Icon className={`h-5 w-5 ${classes.icon}`} />
        ) : null}
        <h3 className={`ml-2 text-sm font-medium ${classes.text}`}>
          {title}
        </h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl ${classes.value}`}
      >
        {value}
      </p>
    </div>
  );
}
