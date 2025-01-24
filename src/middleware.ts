import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const requiredToken = process.env.AUTH_TOKEN
  if (!requiredToken) {
    console.log("No token configured")
    return
  }
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(new URL("/error", request.url))
  }


  if (token !== requiredToken) {
    return NextResponse.redirect(new URL("/error", request.url))
  }
}

export const config = {
  matcher: '/'
}
