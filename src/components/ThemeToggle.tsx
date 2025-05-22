'use client';

import { MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      type="button"
      aria-label="다크 모드 전환"
      className="cursor-pointer"
    >
      <MoonIcon className="h-8 w-8" />
    </button>
  );
}
