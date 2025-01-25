import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log("in callback")
      const isLoggedIn = !!auth?.user;

      const isOnAdmin = nextUrl.pathname.startsWith('/admin')

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/admin', nextUrl))
      }
      return true
    }
  },
  providers: [Credentials({
    async authorize(credentials) {
      const parsedCreds = z
        .object({ username: z.string(), password: z.string() })
        .safeParse(credentials)

      if (!parsedCreds.success) {
        return null
      }
      const correctUsername = process.env.ADMIN_USERNAME || "admin";
      const correctPassword = process.env.ADMIN_PASSWORD;

      if (!correctPassword) {
        return null
      }

      const { password, username } = parsedCreds.data;

      if (password === correctPassword && username === correctUsername) {
        return {
          name: "Admin"
        }
      }

      return null;
    }

  })],
} satisfies NextAuthConfig
