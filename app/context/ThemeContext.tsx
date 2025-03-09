'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  muted: string;
  border: string;
  hover: string;
};

const defaultTheme: Theme = {
  primary: 'blue',
  secondary: 'gray',
  accent: 'blue',
  background: 'white',
  text: 'gray',
  success: 'green',
  error: 'red',
  warning: 'yellow',
  info: 'blue',
  muted: 'gray',
  border: 'gray',
  hover: 'blue'
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (color: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const applyTheme = (primaryColor: string) => {
    const newTheme: Theme = {
      ...theme,
      primary: primaryColor,
      accent: primaryColor,
      info: primaryColor,
      hover: primaryColor,
    };
    setTheme(newTheme);
    localStorage.setItem('userTheme', JSON.stringify(newTheme));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('userTheme');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 