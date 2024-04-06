import React, { useState } from 'react'
import gym from '../assets/gym.jpg'
import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice'

import {  useDispatch,useSelector } from 'react-redux'




export default function SignIn() {
 
 
  const[formData,setFormData] = useState({})
    

   
  const navigate = useNavigate()
  
   const dispatch = useDispatch()
  
   const{loading,error:errorMessage} = useSelector(state => state.user)
  
  
  
  
  
  const handleChane = (e) =>{
  setFormData({...formData,[e.target.id] : e.target.value.trim()})

 }


  const handleSubmit = async(e) => {
 
   e.preventDefault()

  
  if( !formData.email || !formData.password){
   return dispatch(signInFailure("please fill all the fields"))
  }
  
   try{
    
     dispatch(signInStart())
   const res = await fetch("http://localhost:5000/api/auth/signIn",{
   method:"POST",
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify(formData)

   });

       const data = await res.json()
       if(data.success === false){
         dispatch(signInFailure(data.message))
        }
       
       
      

        if(res.ok){
        
        dispatch(signInSuccess(data))
          navigate("/")
        }


       }catch(error){
      dispatch(signInFailure(error.message))

}
}
 
 
 
 
 
 
 
  return (
    <div className='min-h-screen mt-20 '>
 
   
    <div className='flex md:gap-20 gap-5 p-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center '>
 
  
   
     <div className='flex-1  '>
 
   <img src={gym} className='w-[100%] h-[100%] object-cover rounded-md shadow-2xl'/>
   
   <Link to="/" className='flex items-center justify-center  '>

   <div>
    <p className='font-extrabold text-xl shadow-2xl px-2 text-blue-500 '>Strengthen your</p>
    <p className='font-extrabold text-lg shadow-2xl text-gray-500 px-8'> mind-body</p>
  </div>
   
   </Link>
   
   
   </div>
   
   
   
   
   <div className='flex-1  '>
  
   <form className='flex flex-col gap-3' onSubmit={handleSubmit}>

   
   {
    errorMessage && <Alert className='flex items-center justify-center ' color="failure">{errorMessage}</Alert>
  }
  
   
   
  

   <div>
 <Label value="your  email" />

 <TextInput  type="email" placeholder='Email' id="email" onChange={handleChane}/>
 
   </div>
  

   <div>
 <Label value="your Password" />

 <TextInput  type="password" placeholder='Password' id="password" onChange={handleChane}/>
 
   </div>
  
  
  
  <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
   {loading ? <> <Spinner /> <span className='pl-3'>Loading</span></> : 'Sign in' }
   
   
   
 
  
  </Button>
  
   </form>
  
  
  <div className='mt-5 flex gap-3 text-sm'>
   <span>Dont Have Account?</span>
   <Link to="/signup" className='text-blue-700 font-bold'>
   Sign Up
   </Link>
  
  
  </div>
  
  
  
 
   </div>
   
   
   
</div>
    
    
    </div>
  )
}

