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
      upvote.mutate({ id: projectId });
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={'icon'}
      variant={'ghost'}
      className={`text-2xl w-[1em] h-[1em] hover:bg-transparent fill-current stroke-current hover:fill-primary hover:stroke-primary transition-colors duration-500 ease-in-out repeat-1 ${isUpvoted && 'fill-primary stroke-primary'}`}
    >
      {isUpvoted ? <ArrowBigUpDash className="fill-inherit stroke-inherit" /> : <ArrowBigUp className="fill-inherit stroke-inherit" />}
    </Button>
  );
}
