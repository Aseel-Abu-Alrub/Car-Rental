import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const signupSchema=joi.object({
userName:joi.string().min(3).max(20).required(),
email:generalFields.email.required(),
password:generalFields.password.required(),
cPassword:generalFields.cPassword,
phoneNumber:joi.number(),
})

export const signinSchema=joi.object({
  email:generalFields.email.required(),
  password:joi.string().required()  
})