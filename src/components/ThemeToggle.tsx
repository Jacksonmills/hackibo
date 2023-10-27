'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      className='rounded-full'
      variant="ghost"
      size="icon"
      onClick={() => {
        const currentTheme = resolvedTheme ?? theme;
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
      }}
    >
      <span className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">☀️</span>
      <span className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100">🌑</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}