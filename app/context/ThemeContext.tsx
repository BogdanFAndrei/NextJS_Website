'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeColors = {
  primary: string;
  hover: string;
  background: string;
  text: string;
  border: string;
};

type Theme = {
  theme: ThemeColors;
  setTheme: (colors: ThemeColors) => void;
};

const defaultTheme: ThemeColors = {
  primary: 'blue-500',
  hover: 'blue-100',
  background: 'gray-50',
  text: 'gray',
  border: 'gray'
};

const ThemeContext = createContext<Theme>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--blue-500', '#3b82f6');
    root.style.setProperty('--blue-100', '#dbeafe');
    root.style.setProperty('--gray-50', '#f9fafb');
    root.style.setProperty('--red-500', '#ef4444');
    root.style.setProperty('--red-100', '#fee2e2');
    root.style.setProperty('--green-500', '#22c55e');
    root.style.setProperty('--green-100', '#dcfce7');
    root.style.setProperty('--purple-500', '#a855f7');
    root.style.setProperty('--purple-100', '#f3e8ff');
  }, []);

  const updateTheme = (colors: ThemeColors) => {
    setTheme(colors);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 