import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { ThemeProvider } from './context/ThemeContext';
import ThemeCustomizer from './ui/theme-customizer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <ThemeCustomizer />
        </ThemeProvider>
      </body>
    </html>
  );
}