"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export function useSpecialtiesQueryState() {
  const [limit, setLimit] = useQueryState(
    "limit",
    parseAsInteger.withDefault(10),
  );

  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );

  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault("createdAt"),
  );

  const [dateTo, setDateTo] = useQueryState(
    "dateTo",
    parseAsString.withDefault(""),
  );

  const [dateFrom, setDateFrom] = useQueryState(
    "dateFrom",
    parseAsString.withDefault(""),
  );

  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsString.withDefault("DESC"),
  );

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const state = { limit, search, sortBy, sortOrder, dateFrom, dateTo, page };

  const setters = {
    setPage,
    setLimit,
    setSearch,
    setSortBy,
    setDateTo,
    setDateFrom,
    setSortOrder,
  };

  return { state, setters };
}
