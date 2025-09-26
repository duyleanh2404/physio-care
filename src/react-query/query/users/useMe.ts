"use client";

import { useQuery } from "@tanstack/react-query";

import type { User } from "@/types/users";
import { queryKeys } from "@/react-query/query-keys";

async function fetchMe(): Promise<User> {
  const res = await fetch("/api/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return res.json();
}

export function useMe() {
  return useQuery<User>({
    queryKey: queryKeys.users.me,
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
