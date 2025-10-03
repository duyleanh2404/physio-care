"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";

export function useRecordsQueryState() {
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
  const [sortBy, setSortBy] = useQueryState(
    "sortBy",
    parseAsString.withDefault(""),
  );
  const [fields, setFields] = useQueryState(
    "fields",
    parseAsString.withDefault(""),
  );
  const [dateFrom, setDateFrom] = useQueryState(
    "dateFrom",
    parseAsString.withDefault(""),
  );
  const [doctorId, setDoctorId] = useQueryState(
    "doctorId",
    parseAsString.withDefault(""),
  );
  const [frequency, setFrequency] = useQueryState(
    "frequency",
    parseAsString.withDefault(""),
  );
  const [intensity, setIntensity] = useQueryState(
    "intensity",
    parseAsString.withDefault(""),
  );
  const [sortOrder, setSortOrder] = useQueryState(
    "sortOrder",
    parseAsString.withDefault(""),
  );
  const [patientsId, setPatientsId] = useQueryState(
    "patientsId",
    parseAsString.withDefault(""),
  );
  const [treatmentType, setTreatmentType] = useQueryState(
    "treatmentType",
    parseAsString.withDefault(""),
  );
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const state = {
    page,
    limit,
    search,
    status,
    dateTo,
    sortBy,
    fields,
    dateFrom,
    doctorId,
    sortOrder,
    frequency,
    intensity,
    patientsId,
    treatmentType,
  };

  const setters = {
    page: setPage,
    limit: setLimit,
    search: setSearch,
    status: setStatus,
    dateTo: setDateTo,
    sortBy: setSortBy,
    fields: setFields,
    dateFrom: setDateFrom,
    doctorId: setDoctorId,
    sortOrder: setSortOrder,
    frequency: setFrequency,
    intensity: setIntensity,
    patientsId: setPatientsId,
    treatmentType: setTreatmentType,
  };

  return { state, setters };
}
