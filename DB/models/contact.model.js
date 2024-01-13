import mongoose, { Schema,model,Types } from "mongoose";

const conactSchema=new Schema({
userId:{
type:Types.ObjectId,
ref:'User',
required:true
},    
name:{
 type:String,
 required:true   
}, 
email:{
type:String, 
required:true
},
phone:{
 type:Number   
},
message:{
 type:String,
 required:true   
}
},{
 timestamps:true   
})
const contactModel=mongoose.models.Contact || model('Contact',conactSchema)

export default contactModel
