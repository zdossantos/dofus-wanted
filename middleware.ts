import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './app/i18nConfig';



const protectedRoutes: string[] = ["/dashboard", "/suggestions"]

export default auth((req: NextRequest & { auth: any }) => {
  const isLoggedIn: boolean = !!req.auth;
  const isAdmin: boolean = req.auth?.user?.email == process.env.ADMIN_EMAIL;
  const isProtectedRoute: boolean = protectedRoutes.some((route: string) =>
    req.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute && (!isLoggedIn || !isAdmin)) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
})

export function middleware(request: NextRequest) {
	return i18nRouter(request, i18nConfig);
}
// This line configures which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}