import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const createSchema=joi.object({
couponName:joi.string(),
paymentType:joi.string().valid("credit Card","Cash")
})

export const cancelSchema=joi.object({
  orderId:generalFields.id.required()  
})
export const changeSchema=joi.object({
    orderId:generalFields.id.required()  
 
})