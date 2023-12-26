import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createBrandSchema=joi.object({
 name:joi.string().required(),
 status:joi.string().valid('Active','Inactive'),
 file:generalFields.file.required() 
}) 

export const updateBrandSchema=joi.object({
 brandId:generalFields.id.required(),
 name:joi.string().required(),
 status:joi.string().valid('Active','Inactive'),
 file:generalFields.file.required() 
})