import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../models/user.js"



export const updateUser =async(req,res,next) =>{

  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"you are not alowed to update"))
  }


  if(req.body.password){
    if(req.body.password.length < 6){
        return next(errorHandler(400,"error password must have at least 6 charcters"))
    }
 
    req.body.password = bcryptjs.hashSync(req.body.password,10)
   }


  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username > 20){
        return next(errorHandler(400,"user must be between 7 and 20 charcter"))
    }
   
    if(req.body.username.includes(' ')){
        return next(errorHandler(400,"cannont contain spaces"))
    }

   if(req.body.username !== req.body.username.toLowerCase()){
    return next(errorHandler(400,"error"))
   }

  if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
    return next(errorHandler(400,"user name can only contain leeters and numbers"))
  }

  }


  try{
    const updateUser = await User.findByIdAndUpdate(req.params.userId,
        {$set:{username:req.body.username,email:req.body.email,
            profilePicture:req.body.profilePicture,password:req.body.password},},{new:true})
    
     const{password, ...rest} = updateUser._doc
     res.status(200).json(rest)
    }
     catch(error){
        next(error)
     }

} 


//delete user 

export const DeleteUse = async(req,res,next) =>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"you cant delete"))
  }


try{
await User.findByIdAndDelete(req.params.userId)
res.status(200).json("user delted")

}
catch(error){
  next(error)
}



}