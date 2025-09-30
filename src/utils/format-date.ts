export function formatDateTime(date: Date | string | number): string {
  if (!date) return "";
  const d = new Date(date);

  return d.toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function formatDate(date: Date | string | number): string {
  if (!date) return "";
  const d = new Date(date);

  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
