import mongoose, { Schema,Types,model } from "mongoose";

const userSchema=new Schema({
userName:{
type:String,
required:true
},
email:{
type:String,
required:true,
unique:true
},
password:{
type:String,
required:true
},
confirmEmail:{
  type:Boolean,
  default:false
},
image:{
type:Object,
// required:true
},
sendCode:{
type:String,
default:null
},
gender:{
type:String,
default:'Male',
enum:['Male','Female']
},
status:{
  type:String,
  default:'Active',
  enum:['Active','Inactive']
},
role:{
  type:String,
  default:'User',
  enum:['Admin','User']
},
phoneNumber:{
  type:String
},
Address:{
  type:String
},
changePasswordTime:{
  type:Date
}

},
{
  timestamps:true 
})

const userModel=mongoose.models.User || model('User',userSchema)

export default userModel