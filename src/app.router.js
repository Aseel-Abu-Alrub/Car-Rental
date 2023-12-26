import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import carRouter from "./modules/car/car.router.js"
import brandRouter from "./modules/brand/brand.router.js"
import typeRouter from './modules/type/type.router.js'
import { globalErrorHandler } from './services/errorHandling.js'
import cors from "cors"


const initApp=(app,express)=>{
    app.use(cors())
app.use(express.json())
connectDB()

app.get('/',(req,res)=>{
 return res.status(200).json('welcome')   
})

app.use('/auth',authRouter)
app.use('/profile',userRouter)
app.use('/car',carRouter)
app.use('/brand',brandRouter)
app.use('/type',typeRouter)



app.get('/*',(req,res)=>{
    return res.status(409).json('page not found')   
 
})
app.use(globalErrorHandler)
}

export default initApp