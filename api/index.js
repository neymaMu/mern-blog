import express from 'express' 
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const app = express() 

mongoose.connect(process.env.MONG_DB)
.then(() => console.log("Db Connected"))
.catch((error) => console.log(error))




app.listen(5000,()=>{
    console.log("Server is ruing")
})