import mongoose, { Schema,model,Types } from "mongoose"

const typeSchema=new Schema({
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
timestamps:true ,
toJSON:{virtuals:true},
toObject:{virtuals:true}
}
)

typeSchema.virtual('car',{
 ref:'Car',
 localField:'_id',
 foreignField:'typeId'  
})

const typeModel=mongoose.models.Type || model('Type',typeSchema)

export default typeModel