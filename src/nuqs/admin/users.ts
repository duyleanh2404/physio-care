"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export function useUsersQueryState() {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault(""),
  );
  const [dateTo, setDateTo] = useQueryState(
    "dateTo",
    parseAsString.withDefault(""),
  );
  const [dateFrom, setDateFrom] = useQueryState(
    "dateFrom",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [role, setRole] = useQueryState("role", parseAsString.withDefault(""));

  const state = { limit, search, page, role, status, dateTo, dateFrom };

  const setters = {
    setPage,
    setRole,
    setLimit,
    setSearch,
    setStatus,
    setDateTo,
    setDateFrom,
  };

  return { state, setters };
}
