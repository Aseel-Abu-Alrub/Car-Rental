export const asyncHandler=(fn)=>{
return (req,res,next)=>{
   fn(req,res,next).catch(error=>{
    return res.status(500).json({message:"catch error",error})
   }) 
}
}

export const globalErrorHandler=(err,req,res,json)=>{
return res.status(err.cause || 500 ).json({message:err.message})
}