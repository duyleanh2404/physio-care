import { NextResponse } from "next/server";

import { createAxios } from "@/lib/axios-server";

export async function GET(req: Request) {
  try {
    const api = await createAxios();

    const { searchParams } = new URL(req.url);

    const res = await api.get("/api/v1/users", {
      params: Object.fromEntries(searchParams.entries()),
    });

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

export async function POST(req: Request) {
  try {
    const api = await createAxios();
    const formData = await req.formData();

    const res = await api.post("/api/v1/users", formData);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Failed to create user",
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}
