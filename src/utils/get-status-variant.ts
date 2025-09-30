export function getStatusVariant(status: string) {
  switch (status) {
    case "active":
      return "secondary";
    case "pending":
      return "outline";
    case "inactive":
      return "destructive";
    default:
      return "default";
  }
}
