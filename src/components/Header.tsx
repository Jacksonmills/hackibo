import React from 'react';
import { Button } from './ui/button';
import { logo } from '@/styles/fonts';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {

  return (
    <div className='flex items-center gap-2 px-6 py-4 md:px-20 md:py-10 w-full bg-transparent border-b'>
      <h1 className={`relative top-1 text-xl md:text-4xl text-primary font-extrabold mr-auto ${logo.className} leading-none`}>
        <span className="sr-only">HACKIBO</span>
        <span className="hidden md:inline-flex">🍒 HACKIBO</span>
        <span className="inline-flex md:hidden">🍒</span>
      </h1>
      <div className='flex items-center gap-4 md:pl-6 md:pr-2 md:py-2 md:border font-bold rounded-full bg-card'>
        <div className='flex items-center gap-6'>
          <Link href="/" className='hover:text-primary transition-colors ease'>
            About
          </Link>
          <Link href="/" className='hover:text-primary transition-colors ease'>
            Votes
          </Link>
          <Link href="/" className='hover:text-primary transition-colors ease'>
            Login
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Button size="icon" variant={'ghost'} className='rounded-full'>
            ➕
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
