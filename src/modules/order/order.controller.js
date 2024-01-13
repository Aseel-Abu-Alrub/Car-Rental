import carModel from "../../../DB/models/car.model.js"
import couponModel from "../../../DB/models/coupon.model.js"
import orderModel from "../../../DB/models/order.model.js"
import rentalModel from "../../../DB/models/rental.model.js"
import date from 'date-and-time'

export const createOrder=async(req,res,next)=>{
  const rent=await rentalModel.findOne({userId:req.user._id})
  if(!rent){
    return next(new Error(`no rent yet`,{cause:404}))
  }
  req.body.cars=rent.cars

 
  if(req.body.couponName){
    const checkCoupon=await couponModel.findOne({name:req.body.couponName})
    if(!checkCoupon){
       return next(new Error(`coupon ${req.body.couponName} not found `,{cause:404})) 
    }
    const currentDate=new Date()
    if(checkCoupon.expireDate<=currentDate){
        return next(new Error(`coupon ${req.body.couponName} has expired `)) 

    }
    if(checkCoupon.usedBy.includes(req.user._id)){
        return next(new Error(`coupon ${req.body.couponName}  already used `)) 

    }
    req.body.coupon=checkCoupon

  }
  let subTotals=0
  let finalCarList=[]
  for(let car of req.body.cars){
    const checkCar=await carModel.findOne({
     _id:car.carId,
     numberInStock:{$gte:car.quantity} 
    })
    if(!checkCar){
        return next(new Error(`car quanity not available`,{cause:404}))
    }
   
    
      
    
    car=car.toObject()
    car.carName=checkCar.name
    car.unitePrice=checkCar.price
    car.discount=checkCar.discount
     car.days=(car.dropOffDate-car.pickUpDate)/(1000*60*60*24)
    car.finalPrice=car.quantity*checkCar.finalPrice*car.days
    
    subTotals+=car.finalPrice
    finalCarList.push(car) 

  }

const order=await orderModel.create({
 userId:req.user._id,
 cars:finalCarList,
 totalPrice:subTotals-(subTotals*(req.body.coupon?.amount || 0)/100),
 updatedBy:req.user._id,
 couponName:req.body.couponName??''   ,
 paymentType:req.body.paymentType??'Cash'
})

if(req.body.coupon){
   await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.user._id}}) 
}
for(let car of req.body.cars){
  await carModel.updateOne({_id:car.carId},{$inc:{numberInStock:-car.quantity}}) 
}
// await rentalModel.updateOne({userId:req.user._id},{cars:[]})

return res.status(200).json({message:"success",order})

}

export const getOrder=async(req,res,next)=>{
 const order=await orderModel.find({userId:req.user._id}) 

 return res.status(200).json({message:"success",count:order.length,order})
}

export const cancelOrder=async(req,res,next)=>{
  const{orderId}=req.params
  const order=await orderModel.findOne({_id:orderId,userId:req.user._id})
  if(!order){
    return next(new Error(`Invalid order`,{cause:404})) 

  }
  if(order.status!='pending'){
    return next(new Error(`can't cancel this order `,{cause:404})) 

  }
  const cancelOrder=await orderModel.findByIdAndUpdate(orderId,{status:'canceled',updatedBy:req.user._id},{new:true})
  for(let car of order.cars){
    await carModel.updateOne({_id:car.carId},{$inc:{numberInStock:car.quantity}})
  }
  if(order.couponName){
    await couponModel.updateOne({name:order.couponName},{$pull:{usedBy:req.user._id}})
  }
 return res.status(200).json({message:"success",cancelOrder})

}

export const changeStatus=async(req,res,next)=>{
  const{orderId}=req.params

  const order=await orderModel.findById(orderId)
  if(!order){
    return next(new Error(`Invalid order`,{cause:404}))
  }
  if(order.status=='canceled' || order.status=='deliverd'){
    return next(new Error(`can't cancel this order `,{cause:404})) 

  }
  const cancelOrder=await orderModel.findByIdAndUpdate(orderId,{status:'canceled',updatedBy:req.user._id},{new:true})
  for(let car of order.cars){
    await carModel.updateOne({_id:car.carId},{$inc:{numberInStock:car.quantity}})
  }
  if(order.couponName){
    await couponModel.updateOne({name:order.couponName},{$pull:{usedBy:order.userId}})
  }
  return res.status(200).json({message:"success",cancelOrder})
  
}