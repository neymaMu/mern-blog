import React from 'react'
import gym from '../assets/gym.jpg'
import { Link } from 'react-router-dom'
import { Button, Label, TextInput } from 'flowbite-react'



export default function SignUp() {
 
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
  
   <form className='flex flex-col gap-3'>

   <div>
  
  <Label value="your User Name" />

 <TextInput type="text" placeholder='UserName' id="username"/>
 
   </div>

   <div>
 <Label value="your  email" />

 <TextInput type="text" placeholder='Email' id="email"/>
 
   </div>
  

   <div>
 <Label value="your  Password" />

 <TextInput type="text" placeholder='Password' id="password"/>
 
   </div>
  
  
  
  <Button gradientDuoTone="purpleToPink" type="submit">
    Sign Up
  </Button>
  
   </form>
  
  
  <div className='mt-5 flex gap-3 text-sm'>
   <span>Have an Account?</span>
   <Link to="/signin" className='text-blue-700 font-bold'>
   Sign In
   </Link>
  
  
  </div>
  
  
  
  
  
   </div>
   
   
   
</div>
    
    
    </div>
  )
}
