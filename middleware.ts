import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyTokenAsync, COOKIE_NAME } from "@/lib/auth-token"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token || !(await verifyTokenAsync(token))) {
      const loginUrl = new URL("/admin/login", request.url)
      loginUrl.searchParams.set("from", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === "/cases" || pathname.startsWith("/cases/")) {
    return NextResponse.redirect(new URL(pathname.replace("/cases", "/resumes"), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/cases", "/cases/:path*"],
}
