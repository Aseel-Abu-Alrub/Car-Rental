import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const changePassSchema=joi.object({
userId:generalFields.id.required(),
email:generalFields.email.required(),
password:joi.string().required(),
newPassword:generalFields.password.required(),
confirmPassword:joi.valid(joi.ref('newPassword')).messages({'any.only':'not match password '}).required()
})