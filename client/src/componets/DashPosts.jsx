import React, { useEffect, useState } from 'react'
import{useSelector} from 'react-redux'
import{Table} from 'flowbite-react'
import{Link} from 'react-router-dom'



export default function DashPosts() {
  
     const{currentUser} = useSelector((state) => state.user)
  
     const[userPosts,setUserPosts] = useState([])
     
     const[showmore, setShowmore] = useState(true)
    
     
     
     useEffect(() => {
     
    const fetchposts = async() => {

       try{

        const res = await fetch(`http://localhost:5000/api/post/getposts?userId=${currentUser._id}`)

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
 
 
 
 

 
 
 
 
 
 
 
  return (
   
    <div className='table-auto md:ml-20 overflow-x-scroll  p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>

          {currentUser.isAdmin && userPosts.length > 0 ? 
              
              <>
            <Table hoverable className='shadow-md'>

            <Table.Head> 
            
            <Table.HeadCell>Date Updated</Table.HeadCell>
            
            <Table.HeadCell>post Image</Table.HeadCell> 

            <Table.HeadCell>post Title</Table.HeadCell> 


            <Table.HeadCell>Category</Table.HeadCell>

            <Table.HeadCell>Delete</Table.HeadCell>
            
            <Table.HeadCell>Edit</Table.HeadCell>
            
            
             </Table.Head>

             {userPosts.map((post) => (


             <Table.Body className='divide-y'>

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
              <span className='text-red-500 hover:underline cursor-pointer'>Delete</span>
              </Table.Cell>
             
             
              
              <Table.Cell>
                <Link className='text-blue-900 hover:underline' to={`/update-post/${post._id}`}>
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





         </div>
 
 
 
 
 
 
 
  )
}
