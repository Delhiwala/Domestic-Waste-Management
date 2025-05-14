import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the user is authenticated (this is a simplified example)
  // In a real app, you would check for a valid session token
  const isAuthenticated = request.cookies.has("auth_token")
  const isLoginPage = request.nextUrl.pathname === "/login"

  // If the user is not authenticated and not on the login page, redirect to login
  if (!isAuthenticated && !isLoginPage && request.nextUrl.pathname !== "/register") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // If the user is authenticated and on the login page, redirect to home
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

