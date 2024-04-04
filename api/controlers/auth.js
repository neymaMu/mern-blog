 import User from '../models/user.js'
 import bcryptjs from 'bcryptjs'
 
 
 export const Signup = async(req,res) =>{

    try{

  const{username,email,password} = req.body 

  if(!username || !email || !password || username === "" || email === "" || password === ""){
    return res.status(400).json({message:"all feild are required"})
  }

  const hashpassword = bcryptjs.hashSync(password,10)


  const NewUser = new User({username,email,password:hashpassword})
  
   await NewUser.save()
  res.status(200).json({message:"new User have been Saved"})
  
  
    }
    catch(error){
        res.status(500).json(error)
    }
 }