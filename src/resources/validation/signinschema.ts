import * as zod from "zod";

export const signInSchema = zod.object({
    email: zod.string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: zod.string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(2, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  })