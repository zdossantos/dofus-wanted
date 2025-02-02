import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

// List of routes that require authentication
const protectedRoutes: string[] = ["/dashboard", "/suggestions"]

export default auth((req: NextRequest & { auth: any }) => {
  const isLoggedIn: boolean = !!req.auth
  const isProtectedRoute: boolean = protectedRoutes.some((route: string) =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
})

// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}