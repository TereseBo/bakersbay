import NextAuth from "next-auth"
import { ZodError } from "zod"
import { signInSchema } from "@/resources/validation/signinschema"
import Credentials from "next-auth/providers/credentials"
import { getUserFromDb, saltAndHashPassword } from "@/resources/auth/utils"
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
        let user = null

        const { email, password } = await signInSchema.parseAsync(credentials)
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(credentials.password as string)
 
        // logic to verify if user exists
        user = await getUserFromDb(credentials.email as string, pwHash)
 
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