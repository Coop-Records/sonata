import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.url.includes('/api')) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
