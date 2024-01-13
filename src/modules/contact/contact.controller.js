import contactModel from "../../../DB/models/contact.model.js"
import userModel from "../../../DB/models/user.model.js"

export const contact=async(req,res,next)=>{

const{name,email,message}=req.body
const user=await userModel.findOne({_id:req.user._id})
//  return res.json(await contactModel.findOne({email:req.body.email,userId:{$ne:req.user._id}}))
if(!req.body.phone){ 
  req.body.phone=user.phoneNumber  
}
if(req.body.email){
    if(await contactModel.findOne({userId:req.user._id})){
        return next(new Error('you already contact',{cause:404}))
      }
        if(await contactModel.findOne({email:req.body.email})){
        return next(new Error('email already exists',{cause:404}))
      }
       
     
} 

const contact=await contactModel.create({name,email,phone:req.body.phone,message,userId:req.user._id})

if(!contact){ 
    return next(new Error(`error while contact`,{cause:404})) 
}   
return res.status(200).json({message:"success",contact})

    
}

export const getMessages=async(req,res,next)=>{
  const contact=await contactModel.find({})
  return res.status(200).json({message:"success",total:contact.length,contact})  
}

export const deleteContact=async(req,res,next)=>{
 const contact=await contactModel.deleteOne({userId:req.user.id})
 return res.status(200).json({message:"success"})   
}

