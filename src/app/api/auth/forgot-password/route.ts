import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const res = await fetch(
      `${process.env.API_URL}/api/v1/auth/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
