'use client';

import { useTheme } from '@/app/context/ThemeContext';
import { useState } from 'react';
import { PaintBrushIcon } from '@heroicons/react/24/outline';

const themeColors = [
  { name: 'Blue', value: 'blue' },
  { name: 'Purple', value: 'purple' },
  { name: 'Green', value: 'green' },
  { name: 'Red', value: 'red' },
  { name: 'Orange', value: 'orange' },
  { name: 'Pink', value: 'pink' },
];

export default function ThemeCustomizer() {
  const { theme, applyTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-gray-900 p-3 text-white shadow-lg transition-all hover:bg-gray-800"
      >
        <PaintBrushIcon className="h-5 w-5" />
        <span className={`${isOpen ? 'inline' : 'hidden'} pr-2`}>
          Customize Theme
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-64 rounded-lg bg-white p-4 shadow-xl">
          <h3 className="mb-4 text-lg font-semibold">Theme Colors</h3>
          <div className="grid grid-cols-3 gap-2">
            {themeColors.map((color) => (
              <button
                key={color.value}
                onClick={() => applyTheme(color.value)}
                className={`h-12 rounded-md transition-all hover:opacity-80 ${
                  theme.primary === color.value
                    ? 'ring-2 ring-black ring-offset-2'
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                aria-label={`Set theme to ${color.name}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 