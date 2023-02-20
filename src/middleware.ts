import { NextRequest, NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME, AUTH_COOKIE_VALUE } from './constants';

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (!authCookie || authCookie.value !== AUTH_COOKIE_VALUE) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/applications/:applicationId*'
  ]
}