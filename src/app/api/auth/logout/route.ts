import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json({ error: "Token not found" }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    const response = NextResponse.json(data, { status: res.status });
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");

    return response;
  } catch {
    return NextResponse.json({ error: "API call failed" }, { status: 500 });
  }
}
