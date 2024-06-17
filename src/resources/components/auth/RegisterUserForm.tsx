import { saveNewUser } from "@/resources/auth/utils"

export function RegisterUserForm() {



  return (
    <form
      action={async (formData) => {
        "use server"
        console.log('formData in form')
        console.log(formData)
        const data = Object.fromEntries(formData)
        await saveNewUser(data)

      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
  )
}