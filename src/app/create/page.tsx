import { CreateProjectIdea } from '@/components/CreateProjectIdea';
import React from 'react';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 p-2 md:p-6 lg:px-20 lg:py-6'>
      <CreateProjectIdea />
    </div>
  );
}
