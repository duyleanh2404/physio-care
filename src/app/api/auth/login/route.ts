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
      httpOnly: true,
      secure: isProd,
      path: "/",
      maxAge: 60 * 15,
      sameSite: "strict",
    });

    response.cookies.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "strict",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
