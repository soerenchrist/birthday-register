import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

async function handleAdminRoute(request: NextRequest) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    console.log("Admin - Admin password not found, redirecting to /")
    return NextResponse.redirect(new URL('/', request.url))
  }

  console.log("Admin - Admin password found")
  const sess = await auth()

  if (!sess) {
    console.log("Admin - Not logged in, redirecting to /login")
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

async function handleLoginRoute(request: NextRequest) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) {
    console.log("Login - Admin password not found, redirecting to /")
    return NextResponse.redirect(new URL('/', request.url))
  }
  console.log("Login - Admin password found")
  const sess = await auth()

  if (sess) {
    console.log("Login - Logged in, redirecting to /admin")
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

async function handleIndexRoute(request: NextRequest) {
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

export async function middleware(request: NextRequest) {
  switch (request.nextUrl.pathname) {
    case '/admin':
      return await handleAdminRoute(request)
    case '/login':
      return await handleLoginRoute(request)
    case '/':
      return await handleIndexRoute(request)
  }

}

export const config = {
  matcher: ['/', '/admin', '/login']
}
