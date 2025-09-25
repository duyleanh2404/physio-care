import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken } = await req.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ message: "Missing tokens" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";

    cookieStore.set({
      path: "/",
      secure: isProd,
      httpOnly: true,
      maxAge: 60 * 15,
      value: accessToken,
      sameSite: "strict",
      name: "accessToken",
    });

    cookieStore.set({
      path: "/",
      secure: isProd,
      httpOnly: true,
      sameSite: "strict",
      value: refreshToken,
      name: "refreshToken",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ message: "Tokens set successfully" });
  } catch {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
