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
        console.log('email, pass after await signin schema')
        console.log(email, password)
        const user = await authenticateUser(email, password)
        console.log('after authenticate')
        console.log(user)


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
})

export { auth as middleware } from "@/auth"