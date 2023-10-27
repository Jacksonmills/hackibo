import UpVoteButton from "@/components/UpVoteButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRandomHexcode } from "@/styles/randomHexcode";
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
    id: allPosts.length + 1,
    name: 'Weekly AI Post',
    bounties: [],
    upvotes: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }];

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-6 px-6 md:px-20">
      {allPostsWithCurrentWeeklyAIPost.map((post) => (
        <Card key={post.id} className="flex items-start gap-2 w-full p-2">
          <div className="flex items-center gap-2 text-2xl">
            <span className="tabular-nums">{post.id}.</span>
            <UpVoteButton />
          </div>
          <div className="flex flex-col gap-2 flex-grow">
            <div className="flex items-center">
              <h2 className="text-2xl mr-auto">{post.name}</h2>
              <a href="https://www.github.com/new" target="_blank">
                <Button variant={'ghost'}>Build</Button>
              </a>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span>{'69'} upvotes</span>
              <span>{' posted by '}JEM</span>
              <span>{' '}420 hours ago</span>
              <span>{' | '}</span>
              <span className="inline-flex items-center gap-2 font-bold text-sm">
                <span className="flex items-center"><Github className="w-[1em] h-[1em]" />:{' '}</span>
                {bounties.map(({
                  id,
                  name,
                  repoHref
                }: {
                  id: number;
                  name: string;
                  repoHref: string;
                }) => {
                  const color = getRandomHexcode();
                  return (
                    <a key={id} href={repoHref}>
                      <Button variant={'link'} className="font-bold flex gap-2 h-fit w-fit p-0" style={{
                        color
                      }}>
                        {name}
                      </Button>
                    </a>
                  );
                })}
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
