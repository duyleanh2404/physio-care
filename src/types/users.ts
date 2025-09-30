export type User = {
  id: string;
  email: string;
  fullName: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user";
  avatarUrl?: string | null;
  status: "active" | "inactive" | "banned";
};
