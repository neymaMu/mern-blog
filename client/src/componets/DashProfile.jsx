import React from 'react'
import{useSelector } from 'react-redux'
import{Button, TextInput} from 'flowbite-react'


export default function DashProfile() {
 
 
    const{currentUser} = useSelector(state => state.user)
 
 
    return (
    <div className='  max-w-lg mx-auto w-full  p-6 cursor-pinter'>
      
      <h1 className='my-7 text-center font-semibold text-3xl md:w-full  md:ml-60'>Profile</h1>

       <div className='flex w-full mx-auto'>
      
       
         <form className='flex flex-col md:ml-80 gap-3 '>
         
         <div className='w-30 h-30 self-center cursor-pointer  shadow-md overflow-hidden rounded-full'>
       
         <img alt="user" src={currentUser.profilePicture}   className='rounded-full object-cover  h-full w-full border-8 border-[lightgray]'  />

         
         </div>
        
        
        <TextInput className='w-80' id="username" type="text" placeholder='username' defaultValue={currentUser.username}/>
       
        <TextInput className='w-90' id="email" type="email" placeholder='email' defaultValue={currentUser.email}/>
         
        <TextInput className='w-80' id="passowrd" type="password" placeholder='password' defaultValue={currentUser.password}/>
        
        
        
        
         <Button type="submit" gradientDuoTone='purpleToBlue' outline>update</Button>
         
         <div className='flex justify-between text-red-500 mt-4'>
                <span className='font-bold'>Delete Account</span>
                <span className='font-bold'>Sign Out</span>
             </div>
         
         </form>
      </div>


   
   
   
   
   
   
   
    </div>
  )
}
