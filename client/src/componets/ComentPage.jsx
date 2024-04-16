import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { AiFillLike } from "react-icons/ai";
import{useSelector } from 'react-redux'

export default function ComentPage({comen,onLike}) {
 const[user,setUser] = useState({})
 
 const{currentUser} = useSelector((state) => state.user)
 
 
 
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

      
      <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2' >
          
           <button type='button' onClick={() => onLike(comen._id)}>
           
           
            <AiFillLike className={`text-blue-500 text-lg hover:text-blue-900 ${currentUser &&comen.likes.includes(currentUser._id)&&`!text-red-500`}`} />
          
          
            </button>
     
           <p className='text-gray-400'>{comen.numberOflikes > 0 && comen.numberOflikes + " " + (comen.numberOflikes === 1 ? "like" : "likes")}</p>
      
      
      
      
        </div>
      
       </div>



    </div>
  )
}
