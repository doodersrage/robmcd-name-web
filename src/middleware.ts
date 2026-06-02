import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // If the user visits /blog, let it reach your specific blog file
  if (request.nextUrl.pathname.startsWith('/blog')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/search')) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/sitemap.xml')) {
    return NextResponse.next()
  }

  // Rewrite everything else to the catch-all page
  return NextResponse.rewrite(new URL(`/page${request.nextUrl.pathname}`, request.url))
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
