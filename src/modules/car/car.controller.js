import slugify from "slugify"
import brandModel from "../../../DB/models/brand.model.js"
import carModel from "../../../DB/models/car.model.js"
import typeModel from "../../../DB/models/carType.model.js"
import cloudinary from "../../services/cloudinary.js"
import { pagination } from "../../services/pagination.js"

export const createCar=async(req,res,next)=>{
    // return res.json(req.files.mainImage[0])
const{name,brandId,typeId,price,discount}=req.body
const brand=await brandModel.findById(brandId)
if(!brand){
    return next(new Error(`brand ${brandId} not found`))
}

if(req.body.name){
    if(await carModel.findOne({name:req.body.name}).select("name")){
        return next(new Error(`car ${name} already exists`,{cause:404})) 
    }
}
 
 const type=await typeModel.findById(typeId)
 if(!type){
    return next(new Error(`type ${typeId} not found`))

 }
req.body.slug=slugify(name)
req.body.finalPrice=price-(price*(discount||0)/100).toFixed(2)
 

    const{public_id,secure_url}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder:`${process.env.APP_NAME}/car/${name}/mainImage`   
       })
    req.body.mainImage={public_id,secure_url}   


 
req.body.createdBy=req.user._id
req.body.updatedBy=req.user._id

const car=await carModel.create(req.body)

if(!car){
    return next(new Error(`error while creating car`,{cause:404}))
 
}
return res.status(200).json({message:"success",car})

} 

export const getSpecificCar=async(req,res,next)=>{
  const{carId}=req.params  

  const car=await carModel.findById(carId).populate("brandId typeId")

  if(!car){
   return next(new Error(`car ${carId} not found`)) 
  }
  return res.status(200).json({message:"success",car})
}
export const getAllCar=async(req,res,next)=>{

const{skip,limit}=pagination(req.query.page,req.query.limit)
 const car=await carModel.find({}).skip(skip).limit(limit)
 const pages=await carModel.estimatedDocumentCount()
 return res.status(200).json({message:"success",pages:pages,count:car.length,car})   
}
export const getActiveCar=async(req,res,next)=>{
    const{skip,limit}=pagination(req.query.page,req.query.limit)
    const car=await carModel.find({status:'Active'}).skip(skip).limit(limit)
    const pages=await carModel.estimatedDocumentCount()
    return res.status(200).json({message:"success",pages:pages,count:car.length,car})     
}
export const deleteSpecificCar=async(req,res,next)=>{
   const{carId}=req.params
   const car=await carModel.findOneAndDelete({_id:carId},{new:true}) 
   if(!car){
    return next(new Error(`car with id ${carId} not found`))

   }
   return res.status(200).json({message:"success",car})
}

export const updateCar=async(req,res,next)=>{
 const{carId}=req.params
 const car=await carModel.findById(carId)
 
 if(!car){
    return next(new Error(`car with id ${carId} not found`))
 }
if(req.body.name)
{
 if(await carModel.findOne({name:req.body.name,_id:{$ne:car._id}}))   {
   return next(new Error(`car already exists`,{cause:404})) 
 }
 car.name=req.body.name
 car.slug=slugify(req.body.name)
}
if(req.body.modelYear){
    car.modelYear=req.body.modelYear
}
if(req.body.numberOfSeats){
    car.numberOfSeats=req.body.numberOfSeats
}
if(req.body.numberOfDoors){
    car.numberOfDoors=req.body.numberOfDoors
}
if(req.body.fule){
 car.fule=req.body.fule   
}
if(req.body.tramsmission){
    car.tramsmission=req.body.tramsmission
}
if(req.body.status){
    car.status=req.body.status
}
if(req.body.airConditioner){
    car.airConditioner=req.body.airConditioner
}
if(req.body.numberInStock){
    car.numberInStock=req.body.numberInStock
}

if(req.body.price){
    car.price=req.body.price
    car.finalPrice=req.body.price-(req.body.price*(car.discount||0)/100).toFixed(2)
}

if(req.body.discount){
    car.discount=req.body.discount
    car.finalPrice=car.price-(car.price*(req.body.discount||0)/100).toFixed(2)

}
if(req.files.mainImage){
    const {public_id,secure_url}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{
        folder:`${process.env.APP_NAME}/car/${car.name}/mainImage`   
       
    })
    await cloudinary.uploader.destroy(car.mainImage.public_id)
    car.mainImage={public_id,secure_url}   
}
if(req.files.subImages){
    for(const cars of car.subImages){
        await cloudinary.uploader.destroy(cars.public_id)
       }
       car.subImages=[]

    for(const file of req.files.subImages){
        const{public_id,secure_url}=await cloudinary.uploader.upload(file.path,{
            folder:`${process.env.APP_NAME}/car/${car.name}/subImages`   
           })
           
           car.subImages.push({public_id,secure_url})
    }
}

await car.save()
return res.json(car)


}