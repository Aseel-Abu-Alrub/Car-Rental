import mongoose, {Schema,Types,model} from 'mongoose'

const orderSchema=new Schema({
userId:{
 type:Types.ObjectId,
 ref:'User',
 required:true   
},
cars:[{
 carName:{type:String,required:true},
 carId:{type:Types.ObjectId,ref:'Car',required:true},
quantity:{type:Number,required:true},
unitePrice:{type:Number,required:true},
discount:{type:Number},
pickUpDate:{type:Date},
dropOffDate:{type:Date},
days:{type:Number},
finalPrice:{type:Number,required:true}
}],

totalPrice:{
 type:Number,
 required:true   
},
paymentType:{
type:String,
enum:['credit Card','Cash'],
default:'Cash'
},
couponName:{
 type:String,
   
}
,
status:{
 type:String,
 enum:['pending','canceled','confirmed','onWay','deliverd'],
 default:'pending'

},
resonRejected:String,
note:String,
updatedBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true
}


},{
  timestamps:true  
})

const orderModel=mongoose.models.Order || model('Order',orderSchema)

export default orderModel