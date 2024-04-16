import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import{Alert, Button, Textarea} from 'flowbite-react'
import ComentPage from './ComentPage'

export default function ComentSection({postId}) {
 
   const[comment,setComment] = useState('')
   const[errormessage,setErrormessage] = useState(null)
    const[comments,setComments] = useState([])
   
   const{currentUser} = useSelector((state) => state.user)
 
 
     const handleSubmit = async(e) => {
     e.preventDefault() 

     if(comment.length >  200){
      return
     }
      
     try{
      const res = await fetch(`http://localhost:5000/api/coment/create`,{
        method:"POST",
        credentials: 'include',
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({content:comment,postId,userId:currentUser._id})
       })
      
      
        const data = await res.json()
        if(res.ok){
          setComment('')
          setErrormessage(null)
          setComments([data, ...comments])
        }
     }
     catch(error){
      console.log(error)
      setErrormessage(error.message)
     }
    
 }
    
    
    
    
  useEffect(() => {
    fetchComent()
  },[postId])  
 
 
 const fetchComent = async() => {


  try{

  const res = await fetch(`http://localhost:5000/api/coment/getcoment/${postId}`)

   if(res.ok){
    const data = await res.json()
    setComments(data)
  
  }
  
  }
  catch(error){
    console.log(error)
  }
 }
 
console.log(comments) 
 
 
 
 
 
 
 
 
 
 
 
 
 return (
    <div className='p-2 max-w-2xl mx-auto w-full '>


   {currentUser ? 
   
  <div className='flex items-center justify-center text-sm text-gray-500 my-2 gap-2'>

  <p>Signed In as :</p>
  <img src={currentUser.profilePicture} className='h-5 w-5 object-cover rounded-full' />

  <Link to={'/dashbord?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
  
  @{currentUser.username}
  </Link>



  </div>

:
<div className='text-sm text-teal-500 my-5 flex gap-1'>
 you must be Sign In to Comment 
 <Link to="/signin" className='text-blue-500 hover:underline'>
 Sign In
 </Link>



</div>
}

{currentUser &&
 
   <form className='border border-teal-500 rounded-md p-3' onSubmit={handleSubmit}>
   
    <Textarea 
    placeholder='add a Comment...'
    rows='3'
    maxLength='200'
    onChange={(e) => setComment(e.target.value)}
    value={comment}
  
  />

      <div className='flex justify-between mt-5 items-center'>
        <p className='text-gray-500 text-sm'>{200 - comment.length}charector left</p>
        
        <Button outline gradientDuoTone='purpleToBlue' type="submit">
          Submit
        </Button>
      </div>

   {errormessage && <Alert color='failure' className='mt-5'>{errormessage}</Alert>}
  
   
   </form>
}

   
   {comments === 0 ? <p>no Comments</p> :
   
   
   
   <>
   <div className='text-sm my-5 flex items-center gap-1'>
    <p>Comments</p>
    <div className='border border-gray-500 py-1 px-2 rounded-sm'>
      <p>{comments.length}</p>
    </div>
   </div>
   
  
  {comments.map((comen) => (
    <ComentPage key={comen._id} comen={comen}/>
  ))}
  
  
   </>
   
   
   }
   
   
   
    </div>
  )
}
