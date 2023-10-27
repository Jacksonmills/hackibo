'use client';

import React from 'react';
import { Button } from './ui/button';
import { ArrowBigUp, ArrowBigUpDash } from 'lucide-react';

export default function UpVoteButton() {
  const [count, setCount] = React.useState(0);
  const [hasVoted, setHasVoted] = React.useState(false);

  const handleClick = () => {
    console.log('clicked');
    if (hasVoted) return;
    setCount(count + 1);
    setHasVoted(true);
  };

  return (
    <Button
      onClick={handleClick}
      size={'icon'}
      variant={'ghost'}
      className={`text-2xl w-[1em] h-[1em] hover:bg-transparent fill-current stroke-current hover:fill-primary hover:stroke-primary transition-colors duration-500 ease-in-out repeat-1 ${hasVoted && 'animate-bounce fill-primary stroke-primary'}`}
    >
      {hasVoted ? <ArrowBigUpDash className="fill-inherit stroke-inherit" /> : <ArrowBigUp className="fill-inherit stroke-inherit" />}
    </Button>
  );
}
