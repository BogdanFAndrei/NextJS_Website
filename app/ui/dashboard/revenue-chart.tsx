'use client';

import { generateYAxis } from '@/app/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { useTheme } from '@/app/context/ThemeContext';
import clsx from 'clsx';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function RevenueChart({ revenue }: { revenue: any[] }) {
  const { theme } = useTheme();
  const chartHeight = 350;

  // Sort the revenue data by month order
  const sortedRevenue = [...revenue].sort((a, b) => 
    monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );

  const { yAxisLabels, topLabel } = generateYAxis(sortedRevenue);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      <div className={`rounded-xl bg-${theme.secondary}-50 p-4`}>
        <div className="grid grid-cols-[auto,1fr] gap-4 rounded-md bg-white p-4">
          <div
            className="flex flex-col justify-between text-sm text-gray-400"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          <div className="grid grid-cols-12 items-end gap-2">
            {sortedRevenue.map((month) => (
              <div key={month.month} className="flex flex-col items-center gap-2">
                <div
                  className={clsx(
                    'w-full rounded-md transition-all duration-200',
                    {
                      [`bg-${theme.primary}-300 hover:bg-${theme.primary}-400`]: true
                    }
                  )}
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                ></div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {month.month}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className={`h-5 w-5 text-${theme.primary}-500`} />
          <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
