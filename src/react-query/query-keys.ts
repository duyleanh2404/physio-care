export const queryKeys = {
  users: {
    me: ["users", "me"] as const,
    list: (params?: Record<string, any>) => ["users", "list", params] as const,
  },
};
