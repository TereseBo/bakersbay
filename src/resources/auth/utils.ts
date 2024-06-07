
import { User } from "@/resources/db/models/user"
import { connectDB } from "@/resources/db/mongodb"

export function saltAndHashPassword(password: string) {
  console.log("saltAndHashPassword, not yet implemented")
  return "string"
}

export async function getUserFromDb(email: string, pwHash: string):Promise<any> {

  try {
    await connectDB()
    const user = await User.find({ email: email, password: pwHash })
    console.log(user)
    return user

  } catch (err) {
    console.log(err)
    return null
  }
}