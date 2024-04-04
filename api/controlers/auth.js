 import User from '../models/user.js'
 import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
 
 
 export const Signup = async(req,res,next) =>{

    try{

  const{username,email,password} = req.body 

  if(!username || !email || !password || username === "" || email === "" || password === ""){
    next(errorHandler(400,"All Fields are required"))
  }

  const hashpassword = bcryptjs.hashSync(password,10)


  const NewUser = new User({username,email,password:hashpassword})
  
   await NewUser.save()
  res.status(200).json({message:"new User have been Saved"})
  
  
    }
    catch(error){
     next(error)
    }
 }