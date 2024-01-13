import carModel from "../../../DB/models/car.model.js"
import orderModel from "../../../DB/models/order.model.js"
import reviewModel from "../../../DB/models/review.model.js"

export const createReview=async(req,res,next)=>{
 const{carId}=req.params  
 const{comment,rating}=req.body
 const car=await carModel.findById(carId)
 if(!car){
return next(new Error(`car with id ${carId} not found`,{cause:404}))
 }
 const order=await orderModel.findOne({
  userId:req.user._id,
  status:'deliverd',
  "cars.carId":carId  
 })
 if(!order){
    return next(new Error(`can't review this car`,{cause:404}))

 }

const checkReview=await reviewModel.findOne({
   createdBy:req.user._id,
   carId:carId 
})
if(checkReview){
    return next(new Error(`already review`,{cause:404}))

}

 const review=await reviewModel.create({
   comment,
   rating,
   createdBy:req.user._id,
   orderId:order._id,
   carId:carId 
 })
 if(!review){
    return next(new Error(`error while adding review`,{cause:404}))

 }
 return res.status(200).json({message:"success",review})

}
export const getReview=async(req,res,next)=>{
  const review=await reviewModel.findOne({createdBy:req.user._id}).populate("createdBy")
  return res.status(200).json({message:"success",review})
 
}
export const getAll=async(req,res,next)=>{
  const review=await reviewModel.find({}).populate("createdBy")
  return res.status(200).json({message:"success",review})  
}
export const deleteReview=async(req,res,next)=>{
  const{id}=req.params
  const review=await reviewModel.findById(id)
  
  if(!review){
    return next(new Error(`review with id ${id} not found`))
  }
  const deleteReview=await reviewModel.deleteOne({_id:id})
  return res.status(200).json({message:"success"})
}

export const updateReview=async(req,res,next)=>{
    const{id}=req.params
    const review=await reviewModel.findById(id)
    
    if(!review){
      return next(new Error(`review with id ${id} not found`))
    }
    if(req.body.comment){
        review.comment=req.body.comment
    }  
    if(req.body.rating){
        review.rating=req.body.rating
    }
    await review.save()

    return res.status(200).json({message:"success",review})
}