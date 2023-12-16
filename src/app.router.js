import connectDB from '../DB/connection.js'
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import { globalErrorHandler } from './services/errorHandling.js'


const initApp=(app,express)=>{
app.use(express.json())
connectDB()
app.get('/',(req,res)=>{
 return res.status(200).json('welcome')   
})

app.use('/auth',authRouter)
app.use('/profile',userRouter)



app.get('/*',(req,res)=>{
    return res.status(409).json('page not found')   
 
})
app.use(globalErrorHandler)
}

export default initApp