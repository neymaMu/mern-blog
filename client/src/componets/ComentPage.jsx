import React, { useEffect, useState } from 'react'
import moment from 'moment'



export default function ComentPage({comen}) {
 const[user,setUser] = useState({})
 
 
 useEffect(() => {
getUsers()

 },[comen])
 
 
 const getUsers = async() => {
    try{
  
        const res = await fetch(`http://localhost:5000/api/user/${comen.userId}`)

        const data = await res.json() 
       
        if(res.ok){
         setUser(data)
        }

     }
    catch(error){
        console.log(error)
    }
 }
 

 
 
 
    return (
    <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
    
    <div className='flex-shrink-0 mr-3'>

        <img className='w-10 h-10 rounded-full bg-gray-200' src={user.profilePicture} />
    </div>

      <div className='flex-1'>
       <div className='flex items-center mb-1'>
        <span className='font-bold mr-1 text-xs truncate'>{user ? `@${user.username}` : `anonymouse`}</span>
      
       <span className='text-gray-500 text-sm'>
       {moment(comen.createdAt).fromNow()}
       </span>
     
       </div>
       <p className='text-gray-500 pb-2'>{comen.content}</p>

      </div>



    </div>
  )
}
