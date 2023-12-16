import jwt from "jsonwebtoken"
import userModel from "../../DB/models/user.model.js"

export const roles={
 User:'User',
 Admin:'Admin'   
}
export const auth=(accessRule=[])=>{
  return async(req,res,next)=>{
    
    const{authorization}=req.headers
    if(!authorization?.startsWith(process.env.BEARERKEY)){
     return next(new Error("Invalid authorization",{cause:400}))
    }
    const token=authorization.split(process.env.BEARERKEY)[1]
    const decoded=jwt.verify(token,process.env.LOGINTOKEN)
  
    if(!decoded){
      return next(new Error("Invalid authorization",{cause:400}))
    }

    const user=await userModel.findById(decoded._id).select("userName role email changePasswordTime ")
    // console.log(parseInt(user.changePasswordTime.getTime()/1000))
    // console.log(decoded.iat)


    if(!user){
        return next(new Error("not registered user",{cause:400}))

    } 

    if(!accessRule.includes(user.role)){
        return next(new Error("not auth user",{cause:404}))
    
    }
     
    if(parseInt(user.changePasswordTime.getTime()/1000)>decoded.iat){
      return next(new Error("expired token,plz login again",{cause:404}))
      
    }
    req.user=user
    next()

  }
}