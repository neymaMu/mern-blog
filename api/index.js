import express from 'express' 
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRoute from './routes/user.js'
import authRoute from './routes/auth.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import postRoute from './routes/post.js'
 import comentRoute from './routes/coment.js'
 import path from 'path';


dotenv.config()

const app = express() 

app.use(express.json())
app.use(cors())
app.use(cookieParser());




app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })


mongoose.connect(process.env.MONG_DB)
.then(() => console.log("Db Connected"))
.catch((error) => console.log(error))

const __dirname = path.resolve();


app.listen(5000,()=>{
    console.log("Server is ruing")
}) 

app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/post",postRoute)
app.use("/api/coment",comentRoute)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  



app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500 
    const message = err.message || "Internal server error"
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})