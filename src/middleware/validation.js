import joi from "joi"

export const generalFields={
 id:joi.string().min(24).max(24).required(),
 email:joi.string().email().min(5).required().messages({
'string.empty':'email is required',
'string.email':'please enter valid email'
 }),
 password:joi.string().min(4).max(8).required().messages({
    'string.empty':'Password is required'
 }),
 confirmPassword:joi.valid(joi.ref('password')).messages({'any.only':'not match password'}),
 file:joi.object({
    size:joi.number().positive().required(),
    path:joi.string().required(),
    filename:joi.string().required(),
    destination:joi.string().required(),
    mimetype:joi.string().required(),
    encoding:joi.string().required(),
    originalname:joi.string().required(),
    fieldname:joi.string().required(),
    dest:joi.string()

})
}
export const validation=(schema)=>{
return(req,res,next)=>{
  const inputs={...req.body,...req.params,...req.query}
  if(req.file || req.files){
    inputs.file=req.file || req.files
  }
  const validationResult=schema.validate(inputs,{abortEarly:false})  
  if(validationResult.error?.details){
    return res.status(404).json({message:"validation error",validationError:validationResult.error?.details})
  }

  next()
}
}