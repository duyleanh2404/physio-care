import { NextResponse } from "next/server";

import { createAxios } from "@/lib/axios-server";

export async function GET() {
  try {
    const api = await createAxios();

    const res = await api.get("/api/v1/users/me");

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Failed to fetch user data",
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}
