import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function LoadingPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 p-2 md:p-6 lg:px-20 lg:py-6">
      <Skeleton className="w-full h-[98px]" />
      <Skeleton className="w-full h-[98px]" />
      <Skeleton className="w-full h-[98px]" />
      <Skeleton className="w-full h-[98px]" />
      <Skeleton className="w-full h-[98px]" />
    </main>
  );
}
