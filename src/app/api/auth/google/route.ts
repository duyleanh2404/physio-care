import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.API_URL;

  const redirectUrl = `${apiUrl}/api/v1/auth/google`;

  return NextResponse.redirect(redirectUrl);
}
