// frontend/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

// This is a simplified implementation of authentication middleware
// In a real implementation, this would integrate with Better Auth

export function middleware(request: NextRequest) {
  // Allow public routes without authentication
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register') ||
    request.nextUrl.pathname === '/' ||
    request.nextUrl.pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  // Check if the user is trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/chat')) {
    // In a real implementation, we would check for a valid session cookie
    // For now, we'll just allow everything through
    // const token = request.cookies.get('better-auth-session-token');
    
    // If no valid session, redirect to login
    // if (!isValidSession(token)) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};