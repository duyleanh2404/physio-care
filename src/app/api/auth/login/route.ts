import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 },
    );

    const isProd = process.env.NODE_ENV === "production";

    response.cookies.set("accessToken", data.accessToken, {
      path: "/",
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    response.cookies.set("refreshToken", data.refreshToken, {
      path: "/",
      secure: isProd,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
