export type PaginatedResponse<T> = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  data: T;
};

export type AttachmentDataType =
  | ArrayBuffer
  | number[]
  | { data: number[] }
  | Uint8Array;
