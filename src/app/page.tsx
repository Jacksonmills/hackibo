import UpVoteButton from "@/components/UpVoteButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { api } from "trpc/server";

const bounties = [
  {
    id: 1,
    name: 'JEM',
    repoHref: 'https://www.github.com/jacksonmills',
  },
  {
    id: 2,
    name: 'Adam',
    repoHref: 'https://www.github.com/',
  }
];

export default async function Home() {
  const allPosts = await api.post.getAll.query();

  const allPostsWithCurrentWeeklyAIPost = [...allPosts, {
    id: 420,
    name: 'Weekly AI',
    description: 'Weekly AI',
    bounty: 69,
    comments: 69,
    points: 69,
    createdAt: new Date(),
    updatedAt: new Date(),
  }];

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-6 px-6">
      {allPostsWithCurrentWeeklyAIPost.map((post) => (
        <Card key={post.id} className="flex items-start gap-2 w-full p-2">
          <div className="flex items-center gap-2 text-2xl">
            <span>{post.id}.</span>
            <UpVoteButton />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <h2 className="text-2xl mr-auto">{post.name}</h2>
              <span className="flex items-center gap-2 font-bold text-sm">
                <Github className="w-[1em] h-[1em]" />
                Bounties:{' '}
                {bounties.map(({
                  id,
                  name,
                  repoHref
                }: {
                  id: number;
                  name: string;
                  repoHref: string;
                }, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <a key={id} href={repoHref}>
                      <Button variant={'link'} className={`font-bold flex gap-2 h-fit w-fit p-0 ${isEven ? 'text-primary' : 'text-green-500'}`}>
                        {name}
                      </Button>
                    </a>
                  );
                })}
              </span>
            </div>
            <div>
              <span>{'69'} points</span>
              <span>{' by '} JEM</span>
              <span>{' '}420 hours ago</span>
              <span>{' | '}</span>
              <span>{'69'} comments</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
