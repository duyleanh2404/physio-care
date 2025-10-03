import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/react-query/query-keys";

import type { RecordType } from "@/types/records";
import type { PaginatedResponse } from "@/types/global";

export type FetchRecordsParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  fields?: string;
  status?: string;
  dateTo?: string;
  dateFrom?: string;
  doctorId?: string;
  patientsId?: string;
  treatmentType?: string;
  sortOrder?: "asc" | "desc";
};

async function fetchRecords(
  params: FetchRecordsParams = {},
): Promise<PaginatedResponse<RecordType[]>> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.set(key, value.toString());
    }
  });

  const res = await fetch(`/api/patients/records?${query.toString()}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch records");
  }

  return res.json();
}

export function useRecords(params: FetchRecordsParams = {}) {
  return useQuery({
    queryKey: queryKeys.records.list(params),
    queryFn: () => fetchRecords(params),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}
