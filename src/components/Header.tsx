import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { GeistSans } from 'geist/font';
import { UserButton, currentUser } from '@clerk/nextjs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export default async function Header() {
  const user = await currentUser();

  return (
    <div className='flex items-center gap-4 px-6 py-4 md:px-20 md:py-10 w-full bg-transparent border-b'>
      <div className='mr-auto'>
        <Link href="/">
          <h1 className={`relative top-1 text-xl md:text-4xl text-primary font-extrabold ${GeistSans.className} leading-none`}>
            <span className="sr-only">HACKIBO</span>
            <span className="hidden md:inline-flex">🍒 HACKIBO</span>
            <span className="inline-flex md:hidden">🍒</span>
          </h1>
        </Link>
      </div>

      <div className='flex items-center gap-6'>
        {user ? (
          <UserButton afterSignOutUrl='/sign-in' />
        ) : (
          <Link href="/sign-in" className='hover:text-yellow-500 transition-colors ease'>
            Login
          </Link>
        )}
      </div>

      <div className='flex items-center gap-4 md:px-2 md:py-2 md:border font-bold rounded-full bg-card'>
        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <Link href="/create">
              <span className='sr-only'>Create project idea</span>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <span className='inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full'>
                    ➕
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='font-normal'>Create project idea</p>
                </TooltipContent>
              </Tooltip>
            </Link>
          </TooltipProvider>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
