import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function fetchWithRefresh(url: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Missing access token" },
      { status: 401 },
    );
  }

  const isProd = process.env.NODE_ENV === "production";

  const doFetch = async (token: string) => {
    const res = await fetch(url, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    return res;
  };

  let res = await doFetch(accessToken);

  if (res.status !== 401) {
    return res;
  }

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 401 },
    );
  }

  const refreshRes = await fetch(`${process.env.API_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
    credentials: "include",
  });

  if (!refreshRes.ok) {
    return NextResponse.json(
      { error: "Refresh token expired" },
      { status: 401 },
    );
  }

  const refreshData = await refreshRes.json();
  const newAccessToken = refreshData.accessToken;
  const newRefreshToken = refreshData.refreshToken;

  accessToken = newAccessToken;

  res = await doFetch(newAccessToken);

  const response = NextResponse.json(await res.json(), { status: res.status });
  response.cookies.set("accessToken", newAccessToken, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 15,
    sameSite: "strict",
  });
  response.cookies.set("refreshToken", newRefreshToken, {
    path: "/",
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
  });

  return response;
}
