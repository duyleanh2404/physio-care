export const queryKeys = {
  users: {
    me: ["users", "me"] as const,
    list: (params?: Record<string, any>) => ["users", "list", params] as const,
  },
  records: {
    list: (params?: Record<string, any>) =>
      ["records", "list", params] as const,
  },
  specialties: {
    list: (params?: Record<string, any>) =>
      ["specialties", "list", params] as const,
  },
};
