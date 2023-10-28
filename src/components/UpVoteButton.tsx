'use client';

import React from 'react';
import { Button } from './ui/button';
import { ArrowBigUp, ArrowBigUpDash } from 'lucide-react';
import { api } from 'trpc/react';
import { useRouter } from 'next/navigation';

export default function UpVoteButton({
  projectId,
  isUpvoted,
}: {
  projectId: number;
  isUpvoted: boolean;
}) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const upvote = api.projectIdea.upvote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const downvote = api.projectIdea.downvote.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleClick = () => {
    if (isUpvoted) {
      downvote.mutate({ id: projectId });
    } else {
      setIsAnimating(true);

      upvote.mutate({ id: projectId });

      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 500);

      return () => {
        clearTimeout(timeout);
      };
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={'icon'}
      variant={'ghost'}
      className={`fill-current stroke-current transition-colors duration-500 ease-in-out repeat-1 ${isAnimating && 'animate-bounce'} ${isUpvoted && 'fill-primary stroke-primary'}`}
    >
      {isUpvoted ? <ArrowBigUpDash className="fill-inherit stroke-inherit text-4xl w-[1em] h-[1em]" /> : <ArrowBigUp className="fill-inherit stroke-inherit text-4xl w-[1em] h-[1em]" />}
    </Button>
  );
}
