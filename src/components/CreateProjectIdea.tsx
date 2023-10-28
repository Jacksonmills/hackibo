"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useChat } from "ai/react";
import { ScrollArea } from "./ui/scroll-area";

export function CreateProjectIdea() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState('I want to build a project that helps people with their mental health.');

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
  } = useChat({
    body: {
      message: prompt
    }
  });

  const createPost = api.projectIdea.create.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/");
      setName("");
    }
  });

  const lastMessage = messages[messages.length - 1];
  const projectIdeaFromAi =
    lastMessage?.role === 'assistant' ? lastMessage.content : null;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ name });
        }}
        className="flex flex-col gap-2 w-full"
      >
        <Label htmlFor="name">Project name</Label>
        <Input
          name="name"
          type="text"
          placeholder="A very cool project idea"
          maxLength={100}
          minLength={1}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          type="submit"
          disabled={createPost.isLoading}
        >
          {createPost.isLoading ? "Submitting..." : "Submit"}
        </Button>
        {createPost.error?.data?.zodError?.fieldErrors?.name && (
          <p className="text-red-500">
            Error: {createPost.error.data.zodError.fieldErrors.name[0]}
          </p>
        )}
      </form>

      <div className="mx-auto w-full max-w-md py-24 flex flex-col">
        <form onSubmit={handleSubmit}>
          <Input
            className="fixed w-full max-w-md bottom-0 mb-12 bg-card z-10"
            value={input}
            placeholder="Prompt AI for a project idea..."
            onChange={(e) => {
              setPrompt(e.target.value);
              handleInputChange(e);
            }}
          />
        </form>
        <output className="w-full">
          {projectIdeaFromAi && (
            <div className="flex flex-col gap-4">
              <h2 className="sm:text-4xl text-3xl font-mono font-bold">
                Project idea from AI
              </h2>
              <div className="flex flex-col gap-4">
                <ScrollArea className="h-48 p-4 w-full rounded-md border-2">
                  {projectIdeaFromAi}
                </ScrollArea>
              </div>
            </div>
          )}
        </output>
      </div>
    </>
  );
}
