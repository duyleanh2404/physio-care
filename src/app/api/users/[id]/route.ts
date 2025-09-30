import { NextResponse } from "next/server";

import { createAxios } from "@/lib/axios-server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;

    const api = await createAxios();

    const formData = await req.formData();

    const res = await api.put(`/api/v1/users/${id}`, formData);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Failed to update user",
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = (await params).id;

    const api = await createAxios();

    const res = await api.delete(`/api/v1/users/${id}`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.error || "Failed to delete user",
      },
      {
        status: error.response?.status || 500,
      },
    );
  }
}
