import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const contactSchema=joi.object({
name:joi.string().min(3).max(10).required(),
email:generalFields.email.required(),
message:joi.string().min(10).max(40).required(),
phone:joi.string().regex(/^[0-9]{10}$/).messages({"string.pattern.base":"phone number must be 10 digits"})

})