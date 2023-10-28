import UpVoteButton from "@/components/UpVoteButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import { api } from "trpc/server";

export default async function Home() {
  const user = await currentUser();
  const allProjectIdeas = await api.projectIdea.getAllSortedByUpvotes.query();

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-6 px-6 md:px-20">
      {allProjectIdeas.map((projectIdea, index) => {
        const repoName = projectIdea?.name?.toLowerCase().replace(/\s/g, '-');

        const upvotes = projectIdea?.upvotes?.length ?? 0;

        const initialIsUpvoted = projectIdea?.upvotes?.some((upvote) => {
          return upvote === user?.id;
        });

        return (
          <Card key={projectIdea.id} className="flex items-start gap-2 w-full p-2">
            <div className="flex items-center gap-2 text-2xl">
              <span className="tabular-nums">{index + 1}.</span>
              <UpVoteButton projectId={projectIdea.id} isUpvoted={initialIsUpvoted ?? false} />
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <div className="flex items-center">
                <h2 className="text-2xl mr-auto">{projectIdea.name}</h2>
                <a href={`https://github.com/new?name=${repoName}`} target="_blank">
                  <Button variant={'ghost'}>Build</Button>
                </a>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span>{upvotes} upvotes</span>
                <span>posted {projectIdea.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
