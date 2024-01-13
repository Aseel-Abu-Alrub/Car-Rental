import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const createReviewSchema=joi.object({
    carId:generalFields.id.required(),
    comment:joi.string().required().min(3).max(50),
    rating:joi.number().positive().required(),

})

export const deleteSchema=joi.object({
 id:generalFields.id.required()   
})
export const updateSchema=joi.object({
  id:generalFields.id.required(),
  comment:joi.string().required().min(3).max(50),
  rating:joi.number().positive().required(),
})