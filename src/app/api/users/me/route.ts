import { fetchWithRefresh } from "@/lib/fetch-with-refresh";

export async function GET() {
  return await fetchWithRefresh(`${process.env.API_URL}/api/v1/users/me`);
}
