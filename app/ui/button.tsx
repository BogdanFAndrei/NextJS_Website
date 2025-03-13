'use client';

import clsx from 'clsx';
import { useTheme } from '@/app/context/ThemeContext';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function Button({ children, className, variant = 'primary', ...rest }: ButtonProps) {
  const { theme } = useTheme();

  const baseStyles = 'flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';
  
  const variantStyles = {
    primary: `bg-${theme.primary}-500 text-white hover:bg-${theme.primary}-400 focus-visible:outline-${theme.primary}-500 active:bg-${theme.primary}-600`,
    secondary: `bg-${theme.secondary}-100 text-${theme.text}-900 hover:bg-${theme.secondary}-200`,
    danger: `bg-${theme.error}-500 text-white hover:bg-${theme.error}-400 focus-visible:outline-${theme.error}-500 active:bg-${theme.error}-600`,
  };

  return (
    <button
      {...rest}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-50',
        className,
      )}
    >
      {children}
    </button>
  );
}
