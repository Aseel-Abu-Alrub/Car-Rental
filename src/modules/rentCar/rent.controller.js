import carModel from "../../../DB/models/car.model.js"
import rentalModel from "../../../DB/models/rental.model.js"
import userModel from "../../../DB/models/user.model.js"

export const rentCar=async(req,res,next)=>{
const{quantity,pickUpLocation,dropOffLocation,pickUpDate,dropOffDate}=req.body
const{carId}=req.params

const car=await carModel.findById(carId)
if(!car){
    return next(new Error(`car with id ${carId} not found `))
}
const rent=await rentalModel.findOne({userId:req.user._id})
if(!rent){
    const rental= await rentalModel.create({userId:req.user._id,cars:{carId,quantity,pickUpDate,dropOffDate},pickUpLocation,dropOffLocation,phone:req.body.phone})
    return res.status(200).json({message:'success',rental})

}


let matchCar=false
for(let i=0;i<rent.cars.length;i++){
 if(rent.cars[i].carId==carId){
    rent.cars[i].quantity=quantity
    matchCar=true
    break;  
 }

}

if(!matchCar){
 rent.cars.push({carId,quantity,pickUpDate,dropOffDate})   
}

await rent.save()
return res.status(200).json({message:'success',rent})

}

export const getAllRent=async(req,res,next)=>{
 const rent=await rentalModel.find({}).populate("userId cars.carId")
 return res.status(200).json({message:"success",rent})   
}
export const getRent=async(req,res,next)=>{
  const rent=await rentalModel.findOne({userId:req.user._id}).populate("cars.carId")
 
  return res.status(200).json({message:"success",rent})   


}

export const removeRent=async(req,res,next)=>{
 const{carId}=req.body
 const rent=await rentalModel.updateOne({userId:req.user._id},{
  $pull:{
   cars:{carId} 
  }  
 })
 if(!rent){
    return next(new Error('can not remove rent'))
 }
 return res.status(200).json({message:"success"})   
}
export const clearRent=async(req,res,next)=>{
  const clearrent=await rentalModel.updateOne({userId:req.user._id},{cars:[]})  
  return res.status(200).json({message:"success"})   

}