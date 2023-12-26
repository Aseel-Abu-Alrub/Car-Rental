import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const createTypeSchema=joi.object({
    name:joi.string().required(),
    status:joi.string().valid('Active','Inactive'),
    file:generalFields.file 
   })  

   export const updateTypeSchema=joi.object({
    typeId:generalFields.id.required(),
    name:joi.string().required(),
    status:joi.string().valid('Active','Inactive'),
    file:generalFields.file
   })