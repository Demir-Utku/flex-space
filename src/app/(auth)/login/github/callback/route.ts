import { cookies } from 'next/headers'

import { OAuth2RequestError } from 'arctic'
import { eq } from 'drizzle-orm'
import { generateId } from 'lucia'

import { github, lucia } from '@/lib/lucia'
import { db } from '@/server/db'
import { userTable } from '@/server/db/schema'

interface GitHubUser {
  id: string
  login: string
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('github_oauth_state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400
    })
  }

  try {
    const tokens = await github.validateAuthorizationCode(code)

    const githubUserResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`
      }
    })

    const githubUser = (await githubUserResponse.json()) as GitHubUser

    const existingUsers = await db.select().from(userTable).where(eq(userTable.githubId, githubUser.id)).limit(1)

    const existingUser = existingUsers[0]

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {})

      const sessionCookie = lucia.createSessionCookie(session.id)

      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/'
        }
      })
    }

    const userId = generateId(15)

    await db.insert(userTable).values({
      id: userId,
      githubId: githubUser.id,
      username: githubUser.login
    })

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    })
  } catch (e) {
    if (e instanceof OAuth2RequestError && e.message === 'bad_verification_code') {
      // invalid code
      return new Response(null, {
        status: 400
      })
    }
    return new Response(null, {
      status: 500
    })
  }
}
