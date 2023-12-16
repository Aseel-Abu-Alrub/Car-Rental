import mongoose from "mongoose";

const connectDB=async()=>{
await mongoose.connect(process.env.LOCAL_BD)
.then(()=>{
    console.log("connected successfuly")
}).catch((err)=>{
    console.log(`error to connect DB ${err}`)
})
}

export default connectDB