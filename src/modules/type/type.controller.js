import slugify from "slugify"
import typeModel from "../../../DB/models/carType.model.js"
import cloudinary from "../../services/cloudinary.js"
import { pagination } from "../../services/pagination.js"

export const createType=async(req,res,next)=>{
    const{name}=req.body
    if(req.body.name){
        if(await typeModel.findOne({name}).select("name")){
            return next(new Error(`type ${name} already exists`,{cause:404}))
     }  
    } 
     
    if(req.file){
        const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/type/${name}`   
           
           })
           req.body.image={public_id,secure_url}
    }
   
    const type=await typeModel.create({name,slug:slugify(name),status:req.body.status,image:req.body.image,createdBy:req.user._id,updatedBy:req.user._id})
    return res.status(200).json({message:"success",type})    
} 

export const updateType=async(req,res,next)=>{
  
    const{typeId}=req.params
    const type=await typeModel.findById(typeId)
    if(!type){
    return next(new Error(`Invalid brand id ${typeId}`))
    }
    if(req.body.name){
    if(await typeModel.findOne({name:req.body.name,_id:{$ne:type._id}}).select("name")){
    return next(new Error(`type ${req.body.name} already exists`,{cause:404}))    
    }
    type.name=req.body.name  
    type.slug=slugify(req.body.name )
    } 
    
    if(req.body.status){
     type.status=req.body.status   
    }
    if(req.file){
        const {public_id,secure_url}=await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APP_NAME}/type/${type.name}`   
           
        })
        await cloudinary.uploader.destroy(type.image.public_id)
        type.image={public_id,secure_url}   
    }
    
    await type.save()
    return res.status(200).json({message:"success",type})
    
    
}

export const getAllType=async(req,res,next)=>{
    const{skip,limit}=pagination(req.query.page,req.query.limit)
    const type=await typeModel.find({}).skip(skip).limit(limit)
      const pages=await  typeModel.estimatedDocumentCount()
    if(!type){
     return next(new Error("type of car not found",{cause:404})) 
    }
    return res.status(200).json({message:"success",pages:pages,count:type.length,type})
    
} 
export const getActiveType=async(req,res,next)=>{
    const type=await  typeModel.find({status:'Active'}).populate("car")
    
    if(!type){
             return next(new Error("type of car not found",{cause:404})) 
    }
    return res.status(200).json({message:"success",count:type.length,type})
    
  }

  export const getSpiceficType=async(req,res,next)=>{
    const type=await typeModel.findById(req.params.typeId)
    if(!type){
     return next(new Error(`type ${req.params.typeId} not found`,{cause:404}))   
    }
    return res.status(200).json({message:"success",type})
  }
  export const deleteSpecificType=async(req,res,next)=>{
    const{typeId}=req.params
    
    const type=await typeModel.findById(typeId)
    if(!type){
     return next(new Error(`type ${type} not found`,{cause:404}))   
 
    }
    const newType=await typeModel.findByIdAndDelete(typeId)
 
    return res.status(200).json({message:"success"})
   }
   export const deleteAllType=async(req,res,next)=>{
    const type=await typeModel.deleteMany({})
    return res.status(200).json({message:"success"}) 
   }