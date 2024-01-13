import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const createSchema=joi.object({
    name:joi.string().required(),
    expireDate:joi.date().required(),
    amount:joi.number().positive().required()
})
export const updateSchema=joi.object({
  id:generalFields.id.required(),
  name:joi.string().required(),
  expireDate:joi.date().required(),
  amount:joi.number().positive().required()

})
export const softDeleteSchema=joi.object({
    id:generalFields.id.required(),
 
})
export const hardDeleteSchema=joi.object({
    id:generalFields.id.required(),
 
})
export const restore=joi.object({
    id:generalFields.id.required(),
 
})