import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { projectIdeas } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";

export const projectIdeaRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(projectIdeas).values({
        name: input.name,
      });
    }),

  downvote: publicProcedure.input(z.object({
    id: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const projectToUpdate = await ctx.db.query.projectIdeas.findFirst({
      where: eq(projectIdeas.id, input.id),
    });

    if (!projectToUpdate) {
      throw new Error("Project not found");
    }

    if (!user) {
      throw new Error("You must be logged in to downvote");
    }

    const upvotes = projectToUpdate.upvotes;

    if (upvotes?.length === 0) {
      throw new Error("You have not upvoted this project");
    }

    if (upvotes?.includes(user.id)) {
      await ctx.db
        .update(projectIdeas)
        .set({
          upvotes: upvotes.filter((id) => id !== user.id),
        })
        .where(eq(projectIdeas.id, input.id));
    }
  }),

  upvote: publicProcedure.input(z.object({
    id: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const user = await currentUser();
    const projectToUpdate = await ctx.db.query.projectIdeas.findFirst({
      where: eq(projectIdeas.id, input.id),
    });

    if (!projectToUpdate) {
      throw new Error("Project not found");
    }

    if (!user) {
      throw new Error("You must be logged in to upvote");
    }

    const upvotes = projectToUpdate.upvotes;

    if (upvotes?.length === 0 || !upvotes) {
      await ctx.db
        .update(projectIdeas)
        .set({
          upvotes: [user?.id],
        })
        .where(eq(projectIdeas.id, input.id));
    }

    if (upvotes?.includes(user.id)) {
      throw new Error("You have already upvoted this project");
    }

    if (upvotes && upvotes?.length > 0) {
      await ctx.db
        .update(projectIdeas)
        .set({
          upvotes: [...upvotes, user.id],
        })
        .where(eq(projectIdeas.id, input.id));
    }
  }),

  getOneById: publicProcedure.input(z.object({
    id: z.number(),
  })).query(async ({ ctx, input }) => {
    return ctx.db.query.projectIdeas.findFirst({
      where: eq(projectIdeas.id, input.id),
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projectIdeas.findMany();
  }),

  getAllSortedByUpvotes: publicProcedure.query(async ({ ctx }) => {
    const allProjects = await ctx.db.query.projectIdeas.findMany();

    return allProjects.sort((a: { upvotes?: string[] | null; }, b: { upvotes?: string[] | null; }) => {
      const upvotesA = a.upvotes?.length ?? 0;
      const upvotesB = b.upvotes?.length ?? 0;
      return upvotesB - upvotesA;
    });
  }),
});
