import type { AppProps } from 'next/app';
import { ThemeProvider } from '@/app/context/ThemeContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
} 