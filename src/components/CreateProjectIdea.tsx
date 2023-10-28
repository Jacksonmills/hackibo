"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "trpc/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function CreateProjectIdea() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.projectIdea.create.useMutation({
    onSuccess: () => {
      router.refresh();
      router.push("/");
      setName("");
    }
  });

  return (
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
  );
}
