import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../../services/cloudinary.js"
import jwt from "jsonwebtoken"
import sendmail from "../../services/sendmail.js"
import { customAlphabet } from "nanoid"

export const signUp=async(req,res,next)=>{
const{userName,email,password}=req.body

const user=await userModel.findOne({email})
if(user){
return next(new Error("email already exists",{cause:404}))
}
const hashPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
folder:`${process.env.APP_NAME}/profile`
})

const token=jwt.sign({email},process.env.SENDMAILTOKEN)
const html=`<a href='${req.protocol}://${req.headers.host}/auth/confirmemail/${token}'>verify email</a>`
await sendmail(email,'confirm Email',html)
const createUser=await userModel.create({userName,email,password:hashPassword,image:{secure_url,public_id}})
return res.status(202).json({message:"success",createUser})

}
export const signUpAdmin=async(req,res,next)=>{
    const{userName,email,password}=req.body
    
    const user=await userModel.findOne({email})
    if(user){
    return next(new Error("email already exists",{cause:404}))
    }
    const hashPassword=await bcrypt.hash(password,parseInt(process.env.SALT_ROUND))
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.APP_NAME}/profile`
    })
    
    const token=jwt.sign({email},process.env.SENDMAILTOKEN)
    const html=`<a href='${req.protocol}://${req.headers.host}/auth/confirmemail/${token}'>verify email</a>`
    await sendmail(email,'confirm Email',html)
    const createUser=await userModel.create({userName,email,password:hashPassword,image:{secure_url,public_id},role:'Admin'})
    return res.status(202).json({message:"success",createUser})
    
    }
    

export const confirmEmail=async(req,res,next)=>{
const{token}=req.params 
const decoded=jwt.verify(token,process.env.SENDMAILTOKEN)
if(!decoded){
    return next(new Error("invalid token",{cause:404}))
}

const user=await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true})
if(!user){
    return next(new Error("Invalid varify your email or email is verified ",{cause:400}))
 
}
return next(new Error("your email is verified"))

}

export const signin=async(req,res,next)=>{
const{email,password}=req.body
const user=await userModel.findOne({email})

if(!user){ 
    return next(new Error("Invalid data",{cause:404}))
}
const checkuser=await userModel.findOne({email,confirmEmail:true})
if(!checkuser){ 
    return next(new Error("confirm your email",{cause:404}))

}
const match= bcrypt.compareSync(password,user.password)

if(!match){
  return next(new Error("Invalid password ",{cause:404}))  
}
const token =jwt.sign({email:user.email,_id:user._id,role:user.role,userName:user.userName,status:user.status},process.env.LOGINTOKEN
    //,{expiresIn:"30m"}
    )
const refreshToken =jwt.sign({email:user.email,_id:user._id,role:user.role,userName:user.userName,status:user.status},process.env.LOGINTOKEN,{expiresIn:60*60*24*30})

return res.status(200).json({message:"success",accessToken:token,refreshToken})


}

export const sendCode=async(req,res,next)=>{
   const{email}=req.body 
   const code=customAlphabet('123456789abdcz',4)
   
   const user=await userModel.findOneAndUpdate({email},{sendCode:code()},{new:true})
   if(!user){
    return next(new Error("Invalid email"))
   }

   await sendmail(email,'Reset Password ',`<h2>code is:${code()}<h2/>`)

   return res.status(200).json({message:"success",user})
}

export const forgotPassword=async(req,res,next)=>{
const{password,confirmPassword,email,code}=req.body
const user=await userModel.findOne({email})
if(!user){
return next(new Error("Invalid email",{cause:404}))
}
// const Code=await userModel.findOne({sendCode:code})
if(!await userModel.findOne({sendCode:code})){
return next(new Error("Invalid code",{cause:404}))
}
const pass=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))
if(confirmPassword!=password){
return next(new Error("not match password",{cause:404}))
}
user.password=pass
user.sendCode=null
user.changePasswordTime=Date.now()
await user.save()
// const newUser=await userModel.findOneAndUpdate({email},{password:pass,sendCode:null},{new:true})
return res.status(200).json({message:"success",user})

}


