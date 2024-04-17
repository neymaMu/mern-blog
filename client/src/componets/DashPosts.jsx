import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import{Table,Modal,Button} from 'flowbite-react'
import{Link} from 'react-router-dom'
import { FaCircleExclamation } from "react-icons/fa6";


export default function DashPosts() {
  
     const{currentUser} = useSelector((state) => state.user)
  
     const[userPosts,setUserPosts] = useState([])
     
     const[showmore, setShowmore] = useState(true)
    

      const[showModel,setShowModel] = useState(false)
      const [postIdToDelete, setPostIdToDelete] = useState('');
     
     useEffect(() => {
     
    const fetchposts = async() => {

       try{

        const res = await fetch(`http://localhost:5000/api/post/getposts?userId=${currentUser._id}`,{
          credentials: 'include',
        })

         const data = await res.json()
        if(res.ok){
          setUserPosts(data.posts)
         
          if(data.posts.length < 9 ){
            setShowmore(false)
          }
        }
      }
      catch(error){
        console.log(error)
      }
    }

   if(currentUser.isAdmin){
    fetchposts()
   }
  },[currentUser._id])
  
  
  

 
 
 
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `http://localhost:5000/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowmore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 
 
 
  const handleDeletUser = async() =>{
    setShowModel(false);
  try{

  const res = await fetch(`http://localhost:5000/api/post/deletpost/${postIdToDelete}/${currentUser._id}`,{
    credentials: 'include',
  method:"DELETE"
  

})
   
  
  const data = await res.json() 


 if(!res.ok){
  console.log(data.message)
 }else{
  setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete))
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
            <Table hoverable className='shadow-md' >

            <Table.Head> 
            
            <Table.HeadCell>Date Updated</Table.HeadCell>
            
            <Table.HeadCell>post Image</Table.HeadCell> 

            <Table.HeadCell>post Title</Table.HeadCell> 


            <Table.HeadCell>Category</Table.HeadCell>

            <Table.HeadCell>Delete</Table.HeadCell>
            
            <Table.HeadCell>Edit</Table.HeadCell>
            
            
             </Table.Head>

             {userPosts.map((post) => (


             <Table.Body className='divide-y'  key={post._id}>

             <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>

              <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>

               <Table.Cell>

                <Link to={`/post/${post.slug}`}>
                
                <img src={post.image} alt={post.title}  className='w-20 h-10 object-cover bg-green-200'/>
                
                </Link>
               </Table.Cell>
             
               
                <Table.Cell>
                
                <Link className='font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>
                
                   {post.title}
                </Link>


                </Table.Cell>
             
             
        
                   <Table.Cell>
                 
                 {post.category}
                    
                   </Table.Cell>
        
             
             <Table.Cell>
              <span className='text-red-500 hover:underline cursor-pointer' onClick={() => {setShowModel(true);setPostIdToDelete(post._id)}}>Delete</span>
              </Table.Cell>
             
             
              
              <Table.Cell>
                <Link className='text-blue-900 hover:underline' to={`/update/${post._id}`}>
                <span>Edit</span>
                </Link>
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
