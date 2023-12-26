import brandModel from "../../../DB/models/brand.model.js"
import cloudinary from "../../services/cloudinary.js"
import slugify from "slugify"
import { pagination } from "../../services/pagination.js"

export const createbrand=async(req,res,next)=>{
const{name}=req.body
if(req.body.name){
    if(await brandModel.findOne({name}).select("name")){
        return next(new Error(`brand ${name} already exists`,{cause:404}))
 }  
} 
 

const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
 folder:`${process.env.APP_NAME}/brand/${name}`   

})
const brand=await brandModel.create({name,slug:slugify(name),status:req.body.status,image:{public_id,secure_url},createdBy:req.user._id,updatedBy:req.user._id})
return res.status(200).json({message:"success",brand}) 
}
export const updateBrand=async(req,res,next)=>{
  
const{brandId}=req.params
const brand=await brandModel.findById(brandId)
if(!brand){
return next(new Error(`Invalid brand id ${brandId}`))
}
if(req.body.name){
if(await brandModel.findOne({name:req.body.name,_id:{$ne:brand._id}}).select("name")){
return next(new Error(`brand ${req.body.name} already exists`,{cause:404}))    
}
brand.name=req.body.name  
brand.slug=slugify(req.body.name )
} 

if(req.body.status){
 brand.status=req.body.status   
}
if(req.file){
    const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.APP_NAME}/brand/${brand.name}`   
       
    })
    await cloudinary.uploader.destroy(brand.image.public_id)
    brand.image={public_id,secure_url}   
}

await brand.save()
return res.status(200).json({message:"success",brand})


}
export const getAllBrand=async(req,res,next)=>{
const{skip,limit}=pagination(req.query.page,req.query.limit)
  const brand=await  brandModel.find({}).skip(skip).limit(limit)
    const pages=await  brandModel.estimatedDocumentCount()
  if(!brand){
   return next(new Error("brand not found",{cause:404})) 
  }
  return res.status(200).json({message:"success",pages:pages,count:brand.length,brand})
  
}  

export const getActiveBrand=async(req,res,next)=>{
    const brand=await  brandModel.find({status:'Active'})
    
    if(!brand){
             return next(new Error("brand not found",{cause:404})) 
    }
    return res.status(200).json({message:"success",count:brand.length,brand})
    
  }
  export const getSpiceficBrand=async(req,res,next)=>{
    const brand=await brandModel.findById(req.params.brandId)
    if(!brand){
     return next(new Error(`brand ${req.params.brandId} not found`,{cause:404}))   
    }
    return res.status(200).json({message:"success",brand})
  }
  export const deleteSpecificBrand=async(req,res,next)=>{
   const{brandId}=req.params
   
   const brand=await brandModel.findById(brandId)
   if(!brand){
    return next(new Error(`brand ${brandId} not found`,{cause:404}))   

   }
   const newBrand=await brandModel.findByIdAndDelete(brandId)

   return res.status(200).json({message:"success"})
  }

  export const deleteAllBrand=async(req,res,next)=>{
   const brand=await brandModel.deleteMany({})
   return res.status(200).json({message:"success"}) 
  }