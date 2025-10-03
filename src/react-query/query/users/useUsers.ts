"use client";

import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/react-query/query-keys";

import type { UserType } from "@/types/users";
import type { PaginatedResponse } from "@/types/global";

export type FetchUsersParams = {
  page?: number;
  role?: string;
  limit?: number;
  search?: string;
  sortBy?: string;
  fields?: string;
  status?: string;
  dateTo?: string;
  dateFrom?: string;
  sortOrder?: "asc" | "desc";
};

async function fetchUsers(
  params: FetchUsersParams = {},
): Promise<PaginatedResponse<UserType[]>> {
  const query = new URLSearchParams();

  if (params.role) query.set("role", params.role);
  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  if (params.fields) query.set("fields", params.fields);
  if (params.status) query.set("status", params.status);
  if (params.dateTo) query.set("dateTo", params.dateTo);
  if (params.page) query.set("page", params.page.toString());
  if (params.dateFrom) query.set("dateFrom", params.dateFrom);
  if (params.limit) query.set("limit", params.limit.toString());
  if (params.sortOrder) query.set("sortOrder", params.sortOrder);

  const res = await fetch(`/api/users?${query.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export function useUsers(params: FetchUsersParams = {}) {
  return useQuery<PaginatedResponse<UserType[]>>({
    retry: false,
    staleTime: 1000 * 60 * 5,
    placeholderData: (prev) => prev,
    queryFn: () => fetchUsers(params),
    queryKey: queryKeys.users.list(params),
  });
}
