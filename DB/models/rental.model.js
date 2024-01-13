import mongoose, { Schema,Types,model } from "mongoose";

const rentalSchema=new Schema({
 userId:{
 type:Types.ObjectId,
 ref:'User',
 required:true ,
 unique:true
 },
 cars:[{
  carId:{type:Types.ObjectId,ref:'Car',required:true,unique:false},
  quantity:{type:Number,default:1,required:true},
  pickUpDate:{
    type:Date,
    required:true,
    default:Date.now   
   },
   dropOffDate:{
   type:Date,
    required:true,
    default:Date.now   
   }
 }    
 ],
phone:{
type:Number,
unique:true
},
pickUpLocation:{
  type:String,
  required:true  
},
dropOffLocation:{
    type:String,
    required:true     
},


},{
  timestamps:true  
})
const rentalModel=mongoose.models.Rental || model('Rental',rentalSchema)

export default rentalModel