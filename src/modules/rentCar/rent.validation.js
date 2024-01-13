import joi from "joi";
import { generalFields } from "../../middleware/validation.js";


export const createSchema=joi.object({
   quantity:joi.number().integer().positive().required(),
   pickUpLocation:joi.string().required(),
   dropOffLocation:joi.string().required(),
   pickUpDate:joi.date().required(),
   dropOffDate:joi.date().required(),
   carId:generalFields.id.required(),
   phone:joi.string().regex(/^[0-9]{10}$/).messages({"string.pattern.base":"phone number must be 10 digits"})
})

export const removeSchema=joi.object({
  carId:generalFields.id.required()  
})