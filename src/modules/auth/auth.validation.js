import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const signupSchema=joi.object({
userName:joi.string().min(3).max(20).required(),
email:generalFields.email.required(),
password:generalFields.password.required(),
confirmPassword:generalFields.confirmPassword,
file:generalFields.file.required().messages({'any.required':'file is required'})
})

export const signinSchema=joi.object({
  email:generalFields.email.required(),
  password:generalFields.password.required()  
})