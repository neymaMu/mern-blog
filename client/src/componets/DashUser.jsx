import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import{Table,Modal,Button} from 'flowbite-react'
import{Link} from 'react-router-dom'
import { FaCircleExclamation } from "react-icons/fa6";
import { FaCheck, FaTimes } from 'react-icons/fa';


export default function DashUser() {
  
     const{currentUser} = useSelector((state) => state.user)
  
     const[userPosts,setUserPosts] = useState([])
     
     const[showmore, setShowmore] = useState(true)
   

      const[showModel,setShowModel] = useState(false)
      const [postIdToDelete, setPostIdToDelete] = useState('');
     
     
    useEffect(() =>{
     featchusers()
    },[]) 


     const  featchusers = async() => {

        try{
      const res = await fetch("http://localhost:5000/api/user/getuser",{
        credentials: "include",
      })
        

     const data = await res.json()
    
     if (res.ok) {
        setUserPosts(data.users);
        if (data.users.length < 9) {
            setShowmore(false);
        }
      }
    }
        catch(error){
            console.log(error)
        }
     }
  

  
  
  
  
  
  
       const handleShowMore=async() => {

        const startIndex = userPosts.length 

        try{

     const res = await fetch(`http://localhost:5000/api/user/getuser?startIndex=${startIndex}`,{
      credentials: "include",
     })

     const data = await res.json();
     if (res.ok) {
       setUserPosts((prev) => [...prev, ...data.users]);
       if (data.users.length < 9) {
         setShowmore(false);
       }
     }
      
      
      
        }
        catch(error){
            console.log(error)
        }
       
}
 
 
 
 
 
 
 
  const handleDeletUser =async () =>{

  try{
  
    const res = await fetch(`https://mern-blog-kdbu.onrender.com/api/user/delete/${postIdToDelete}`,{
      credentials: "include",
    method:"DELETE",
 
    })

     const data = await res.json()

       if(res.ok){
          setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
          setShowModel(false)
     
     
        }else{
      console.log(data.message)
     }
    
     
    
    }
  catch(error){
    console.log(error)
  }
  
  
  
  }
   
 
 
 
 
 
 
 
  return (
   
    <div className='table-auto md:ml-20 overflow-x-scroll  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

    {currentUser.isAdmin && userPosts.length > 0 ? 
        
        <>
      <Table hoverable className='shadow-md'>

      <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>

       {userPosts.map((post) => (


       <Table.Body className='divide-y' key={post._id}>

       <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

        <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

         <Table.Cell>

        
          
          <img src={post.profilePicture} alt={post.title}  className='w-10 h-10 object-cover rounded-full bg-green-200'/>
          
        
         </Table.Cell>
       
         
          <Table.Cell>
          
      
          
             {post.username}
   


          </Table.Cell>
       
       
  
             <Table.Cell>
           
           {post.email}
              
             </Table.Cell>
  
          
             <Table.Cell>
                    {post.isAdmin  ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
          
       
       
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setPostIdToDelete(post._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                      Delete
                    </span>
                  </Table.Cell>

        
     
          
          
          </Table.Row>



       </Table.Body>


       ))}
   
   
       
           </Table>
    
    
    {showmore && <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>show more</button>}
    
 
    
    
    
    </>
      : 
    
  <p>no posts </p>
  
  
  }




<Modal show={showModel} 

onClose={() => setShowModel(false)}
popup
size="md"
>
   <Modal.Header/> 

 <Modal.Body>
<div className='text-center'>
<FaCircleExclamation  className='h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto'/>
<h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post</h3>

  
  <div className='flex justify-center gap-4'>
    <Button color="failure" onClick={handleDeletUser}>
      Yes Am Sure
    </Button>
 
 
   <Button color="gray" onClick={() => setShowModel(false)}>No ,Cancel</Button>
   </div>
   </div>

</Modal.Body>
  </Modal>

  
  
  
  
  
  
  
  
   </div>
 
 
 
 
 
 
  )
}
