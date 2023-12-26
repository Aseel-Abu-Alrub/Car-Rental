import mongoose, { Schema,model,Types } from "mongoose"

const brandSchema=new Schema({
name:{
type:String,
required:true,
unique:true
},
slug:{
    type:String,
    required:true,
 },
image:{
   type:Object,
   required:true 
},
status:{
 type:String,
 enum:['Active','Inactive'],
 default:'Active'   
},
createdBy:{type:Types.ObjectId,ref:'User',required:true},
updatedBy:{type:Types.ObjectId,ref:'User',required:true}
},
{
timestamps:true    
}
)

const brandModel=mongoose.models.Brand || model('Brand',brandSchema)

export default brandModel