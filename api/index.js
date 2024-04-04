import express from 'express' 
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'


dotenv.config()

const app = express() 
app.use(express.json())

mongoose.connect(process.env.MONG_DB)
.then(() => console.log("Db Connected"))
.catch((error) => console.log(error))




app.listen(5000,()=>{
    console.log("Server is ruing")
}) 

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)



app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500 
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})