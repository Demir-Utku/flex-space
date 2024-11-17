import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { verifyRequestOrigin } from 'lucia'

export function middleware(req: NextRequest) {
  if (req.method === 'GET') {
    return NextResponse.next()
  }

  const origin = req.headers.get('Origin')
  const host = req.headers.get('Host')

  if (!origin || !host || !verifyRequestOrigin(origin, [host])) {
    return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|static|trpc)(.*)']
}
