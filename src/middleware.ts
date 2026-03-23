import { NextResponse } from "next/server";

// Auth temporarily disabled — admin pages are publicly accessible
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
