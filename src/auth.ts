import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { ZodError } from "zod"

import { getUserFromDb, saltAndHashPassword } from "@/resources/auth/utils"
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
        let user = null

        const { email, password } = await signInSchema.parseAsync(credentials)
        console.log('email, pass after await signin schema')
 console.log(email, password)
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password as string)
        console.log('pwhash from hash func')
 console.log(pwHash)
        // logic to verify if user exists
        user = await getUserFromDb(credentials.email as string, pwHash)
        console.log('db response from get user')
        console.log(user)
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.")
        }
 
        // return user object with the their profile data
        return user
      },
    }),
  ],
})

export { auth as middleware } from "@/auth"