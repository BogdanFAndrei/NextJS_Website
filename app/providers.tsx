'use client';

import { ThemeProvider } from './context/ThemeContext';
import ThemeCustomizer from './ui/theme-customizer';

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {children}
      <ThemeCustomizer />
    </ThemeProvider>
  );
} 