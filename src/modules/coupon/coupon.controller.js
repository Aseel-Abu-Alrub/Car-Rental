import couponModel from "../../../DB/models/coupon.model.js"
import { pagination } from "../../services/pagination.js"

export const createCoupon=async(req,res,next)=>{
 const{name}=req.body 
 req.body.expireDate=new Date(req.body.expireDate)
 if(await couponModel.findOne({name})){
  return next (new Error(`coupon ${name} already exists`))  
 }
 req.body.createdBy=req.user._id
 req.body.updatedBy=req.user._id
 const coupon=await couponModel.create(req.body)
 return res.status(200).json({message:"success",coupon})
}

export const updateCoupon=async(req,res,next)=>{
  const{id}=req.params
  const coupon=await couponModel.findById(id)
  if(!coupon ){
    return next(new Error(`coupon with id ${id} not found`))
  }  
  if(req.body.name){
    if(await couponModel.findOne({name:req.body.name,_id:{$ne:coupon._id}})){
      return next(new Error(`coupon ${req.body.name} already exists`))  
    }
    coupon.name=req.body.name
  }
  if(req.body.amount){
    coupon.amount=req.body.amount
  }
  if(req.body.expireDate){
    coupon.expireDate=new Date(req.body.expireDate)
  }
  coupon.updatedBy=req.user._id

  await coupon.save()

  return res.status(200).json({message:"success",coupon})

} 
export const getCoupon=async(req,res,next)=>{
const{skip,limit}=pagination(req.query.page,req.query.limit)
  const coupon=await couponModel.find({}).skip(skip).limit(limit)
  const total=await couponModel.estimatedDocumentCount()
  return res.status(200).json({message:"success",total,pages:coupon.length,coupon})  
}

export const softDelete=async(req,res,next)=>{
 const{id}=req.params
 if(!await couponModel.findById(id)){
    return next(new Error(` coupon with id ${id} not found`))
 }
 const coupon=await couponModel.findOneAndUpdate({_id:id,isDeleted:false},{isDeleted:true},{new:true})  
 if(!coupon){
    return res.status(404).json({message:`can not delete this coupon`})

} 
 return res.status(200).json({message:"success",coupon})
}

export const restore=async(req,res,next)=>{
    const{id}=req.params
 if(!await couponModel.findById(id)){
    return next(new Error(` coupon with id ${id} not found`))
 }
 const coupon=await couponModel.findOneAndUpdate({_id:id,isDeleted:true},{isDeleted:false},{new:true})  
 if(!coupon){
    return res.status(404).json({message:`can not restore this coupon`})

} 
 return res.status(200).json({message:"success",coupon}) 
}
export const hardDelete=async(req,res,next)=>{
    const{id}=req.params
 if(!await couponModel.findById(id)){
    return next(new Error(` coupon with id ${id} not found`))
 }
 const coupon=await couponModel.findOneAndDelete({_id:id})  
 if(!coupon){
    return res.status(404).json({message:`can not delete this coupon`})

} 
 return res.status(200).json({message:"success"}) 
}