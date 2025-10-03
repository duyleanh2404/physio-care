import type { UserType } from "./users";

export type RecordType = {
  id: string;
  goals: string;
  history: string;
  doctorId: string;
  progress: string;
  doctor: UserType;
  patient: UserType;
  createdAt: string;
  updatedAt: string;
  intensity: string;
  frequency: string;
  recordCode: string;
  patientsId: string;
  treatmentType: string;
  attachmentName?: string;
  attachmentMime?: string;
  attachment?: File | null;
  attachmentPreview?: string;
  attachmentData?: ArrayBuffer | number[];
  status: "active" | "inactive" | "completed";
};
