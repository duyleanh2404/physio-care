import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/query-keys";

import type { PaginatedResponse } from "@/types/global";
import type { SpecialtyType } from "@/types/specialties";

export type FetchSpecialtiesParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC" | "asc" | "desc";
  fields?: string;
};

async function fetchSpecialties(
  params: FetchSpecialtiesParams = {},
): Promise<PaginatedResponse<SpecialtyType[]>> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, value.toString());
    }
  });

  const res = await fetch(`/api/doctors/specialties?${query.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch specialties");
  }

  return res.json();
}

export function useSpecialties(params: FetchSpecialtiesParams = {}) {
  return useQuery({
    queryKey: queryKeys.specialties.list(params),
    queryFn: () => fetchSpecialties(params),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
