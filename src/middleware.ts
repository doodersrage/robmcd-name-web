import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DIRECT_APP_PREFIXES = [
  '/llm-prompt-studio',
  '/comfyui-prompt-studio',
  '/blog',
  '/search',
  '/admin',
  '/feed.xml',
  '/sitemap.xml',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/llm-prompt-studio' || pathname.startsWith('/llm-prompt-studio/')) {
    const internal = pathname.replace('/llm-prompt-studio', '/comfyui-prompt-studio')
    return NextResponse.rewrite(new URL(internal, request.url))
  }

  if (DIRECT_APP_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next()
  }

  // Rewrite CMS pages to the catch-all Payload route
  return NextResponse.rewrite(new URL(`/page${pathname}`, request.url))
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
