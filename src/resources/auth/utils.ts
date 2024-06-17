
import bcrypt from 'bcrypt'

import { User } from "@/resources/db/models/user"
import { connectDB } from "@/resources/db/mongodb"

import { signInSchema } from '../validation/signinschema';
const saltRounds = 10;

export async function saveNewUser(credentials:any) {
  //Validate user credential format
  console.log('credentials in func')
  const { email, password } = await signInSchema.parseAsync(credentials)
  console.log(email, password)

  //Hash pass
  const pwHash = bcrypt.hashSync(password, saltRounds);
  const newUser = new User({
    email: email,
    password: pwHash,
  })
  //Save new user to db
  await connectDB()
  const dbRes = await newUser.save()
  return dbRes


}

export async function authenticateUser(email: string, password: string) {

  //fetch user from db
  const user = await getUserFromDb(email)
  
  //compare pass
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return user
  } else {
    return null
  }

}

export async function getUserFromDb(email: string): Promise<any> {
console.log('in find user func')
console.log(email)
  try {
    await connectDB()
    const user = await User.findOne({ email: email })
    console.log('user in getOne')
    console.log(user)
    return user

  } catch (err) {
    console.log(err)
    return null
  }
}