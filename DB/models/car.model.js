import mongoose, { Schema,model,Types } from "mongoose"

const carSchema=new Schema({
name:{
type:String,
required:true,
unique:true
},
slug:{
   type:String,
   required:true,
},
mainImage:{
   type:Object,
   required:true
  },
  subImages:[{
   type:Object,
   required:true
  }],
modelYear:{
   type:Number,
   required:true 
},

numberOfSeats:{
type:Number,
default:5
},
numberOfDoors:{
 type:Number,
 default:4   
},
fule:{
   type:String,
   enum:['Diesel','Hybrid','Gasoline'],
   default:'Diesel',
},

tramsmission:{
type:String,
enum:['Manual','Automatic'],
default:'Manual'
},
status:{
   type:String,
   enum:['Active','Inactive'],
   default:'Active'  
},
airConditioner:{
type:Boolean,
default:false
},
numberInStock:{
type:Number,
required:true,
default:1
},
brandId:{
type:Types.ObjectId,
ref:'Brand',
required:true
},
typeId:{
type:Types.ObjectId,
ref:'Type',
required:true
},
price:{
 type:Number,
 required:true  
},
discount:{
 type:Number,
 default:0  
},
finalPrice:{
type:Number,

},
number_rentals:{
type:Number,
default:0
 },
//  createdBy:{
//    type:Types.ObjectId,
//    ref:'User',
//    required:true 
// },  
// updateddBy:{
//    type:Types.ObjectId,  
//    ref:'User',  
//   required:true
// },
},

{
timestamps:true ,
toJSON:{virtuals:true},
toObject:{virtuals:true},

}
)
carSchema.virtual("reviews",{
 localField:'_id',
 foreignField:'carId',
 ref:'Review'  
})

const carModel=mongoose.models.Car || model('Car',carSchema)

export default carModel