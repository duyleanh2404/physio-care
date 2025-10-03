import type { AttachmentDataType } from "@/types/global";

export function toFileFromAttachment(
  data: AttachmentDataType,
  name: string,
  mime?: string,
): File | null {
  let byteArray: Uint8Array | null = null;

  if (data instanceof ArrayBuffer) {
    byteArray = new Uint8Array(data);
  } else if (Array.isArray(data)) {
    byteArray = new Uint8Array(data);
  } else if ("data" in data && Array.isArray(data.data)) {
    byteArray = new Uint8Array(data.data);
  } else if (data instanceof Uint8Array) {
    byteArray = new Uint8Array(data);
  }

  if (!byteArray) return null;

  const buffer = byteArray.buffer as ArrayBuffer;

  const blob = new Blob([buffer], {
    type: mime || "application/octet-stream",
  });

  return new File([blob], name, {
    type: mime || "application/octet-stream",
  });
}
