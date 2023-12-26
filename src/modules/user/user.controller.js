import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"

export const profile=async(req,res,next)=>{
  
    const user=await userModel.findById(req.user._id)

    return res.status(200).json({message:"success",user})
} 

export const updatePassword=async(req,res,next)=>{
const{userId}=req.params
const{email,password,newPassword,confirmPassword}=req.body
const user=await userModel.findById(userId)
if(!user){
return next(new Error("not auth user",{cause:404}))
}
if(!await userModel.findOne({email,_id:userId})){
 return next(new Error("Invalid email",{cause:404}))
   
}
const passuser=bcrypt.compareSync(password,user.password)
if(!passuser){
 return next(new Error("Invalid password",{cause:404}))
    
}
const newPass=bcrypt.hashSync(newPassword,parseInt(process.env.SALT_ROUND))
user.password=newPass
user.save()

return res.json({message:"success"})

}