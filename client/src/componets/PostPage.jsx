import React, { useEffect, useState } from 'react'
import{Link, useParams} from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import ComentSection from './ComentSection';
import PostCard from './PostCard';


export default function PostPage() {
 
 const[loading,setLoading] = useState(true)
 const[error,setError] = useState(false)
 const[post,setPost] = useState(null)
 const[recentpost,setRecentpost] = useState(null)
    
 
 
 const{postId} = useParams()
 
 
 useEffect(() =>{
    fetchPost()
 },[postId])
 
   
   const fetchPost =async () =>{

    try{

      setLoading(true) 

      const res = await fetch(`http://localhost:5000/api/post/getposts?slug=${postId}`)
      
      const data = await res.json()
      
      
      if(!res.ok){
        setError(true)
        setLoading(false)
      }
    
    
       if(res.ok){

      setPost(data.posts[0])
      setLoading(false)
      setError(false)
    
    }
    
    }
    catch(error){
        console.log(error)
        setError(true)
        setLoading(false)
    }
   }
 
 
 
   useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`http://localhost:5000/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentpost(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
   
  
  
  
  
  
  
   if(loading) return(

    <div className='flex items-center justify-center min-h-screen'>
     <Spinner size='xl'/>
    </div>
   )
 
   
   
   
  
   
        
   
   
   
   
   
   
   return (
          <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>


            <h1 className='text-3xl  p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{post && post.title}</h1>

          
              <Link to={`/search?categroy=${post && post.category}`} className='self-center '>
               <Button color='gray' pill size='xs'>

              {post && post.category}
               </Button>
               </Link>
          
          
           <img src={post && post.image} alt={post && post.image} className=' mx-auto h-[40%] w-[50%] p-3 object-cover' />
           
           
              <div className='flex justify-between border-b border-slate-300 mx-auto w-full max-w-2xl text-xs'>

             <span>{post && new Date(post.updatedAt).toLocaleDateString()}</span>
             <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins Read</span>

              </div>
           
           
           <div className='p-3 max-w-2xl w-full mx-auto post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>



           </div>
           
           
           
           <ComentSection postId={post._id}/>
           
           
                <div className='flex flex-col justify-center items-center mb-5'>
                  <h1 className='text-xl mt-5'>Recent Post</h1>
              
              
              <div className='flex flex-warp gap-2 mt-5 justify-center w-[70%] '>


                {recentpost && 
                
              recentpost.map((pos) => <PostCard key={pos._id} pos={pos}/>)}
              </div>
              
              
                </div>




           
            </main>
 



)
}
