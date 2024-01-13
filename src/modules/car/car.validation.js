import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const crateCarSchema=joi.object({
  name:joi.string().min(3).max(20).required(),
  brandId:generalFields.id.required(),
  typeId:generalFields.id.required(),
  price:joi.number().positive().required(),
  discount:joi.number().positive().required(),
  file:joi.object({
   mainImage:joi.array().items(generalFields.file.required()),
   subImages:joi.array().items(generalFields.file.required()).min(1).max(4) 
  }),
  modelYear:joi.string().required(),
  numberInStock:joi.number().required()
})

export const getSpecificCarSchema=joi.object({
carId:generalFields.id.required()
})

export const deleteSchema=joi.object({
    carId:generalFields.id.required()

})
export const updateSchema=joi.object({
    carId:generalFields.id.required(),
    file:joi.object({
        mainImage:joi.array().items(generalFields.file.required()),
        subImages:joi.array().items(generalFields.file.required()).min(1).max(4) 
       }),

})