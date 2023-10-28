import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { GeistSans } from 'geist/font';
import { UserButton, currentUser } from '@clerk/nextjs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default async function Footer() {
  const user = await currentUser();

  return (
    <footer className='flex items-center justify-center gap-4 p-2 md:p-6 lg:px-20 lg:py-12 w-full bg-transparent'>
      <h1 className={`relative top-1 text-xl md:text-4xl font-extrabold ${GeistSans.className} leading-none`}>
        🍒 HACKIBO
      </h1>
      <ThemeToggle />
    </footer>
  );
}
