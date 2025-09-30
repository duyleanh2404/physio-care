import { NextResponse } from "next/server";

import { createAxios } from "@/lib/axios-server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;

    const api = await createAxios();

    const res = await api.put(`/api/v1/users/unban/${id}`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Failed to unban user",
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}
