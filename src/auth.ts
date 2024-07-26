import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"

import { authenticateUser } from "@/resources/auth/utils"
import { signInSchema } from "@/resources/validation/signinschema"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log('credentials inaurh')
        console.log(credentials)


        const { email, password } = await signInSchema.parseAsync(credentials)
        // logic to verify if user exists
        const user = await authenticateUser(email, password)

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          console.log('no user was found')
          throw new Error("User not found.")
        } else {
          console.log('a user was found')
          // return user object with the their profile data
          return user
        }
      },
    }),
  ],
  
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  },
})


export { auth as middleware } from "@/auth"