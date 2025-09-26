export type User = {
  id: string;
  email: string;
  password?: string | null;
  fullName: string;
  avatarUrl?: string | null;
  role: string;
  refreshToken?: string | null;
  status: string;
  provider: string;
  verificationOtp?: string | null;
  otpExpiresAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
