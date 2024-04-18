import React,{useState,useEffect} from 'react'
import{Link} from 'react-router-dom'
import PostCard from '../componets/PostCard';



export default function Home() {
  
  
  
  const [posts, setPosts] = useState([]);
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:5000/api/post/getposts'
     
     );
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  
  
  
  return (
    <div  >
     

     <div className='flex flex-col gap-3 p-28 px-3 max-w-6xl mx-auto '>
       
       <div>
      <h1 className='text-3xl font-bold lg:text-3xl '>Welcome to my Gym Blog</h1>
       
       
      <Link
          to='/search'
          className='text-xs sm:text-sm text-teal-500  font-bold hover:underline'
        >
          View all posts
        </Link>
       
       </div>
       
       <div className='flex justify-end items-center   '>
      
        <div className='flex flex-col '>
      <p className='text-blue-900 font-bold text-lg'>But it ain't about how hard you hit</p>
      <p className='text-blue-900 font-bold text-lg'> it's about how hard you " </p>
     <p className='text-blue-900 font-bold text-lg'>can get hit and keep moving forward</p>
      </div>
      <img className='h-[30%] w-[30%] rounded-md shadow-md' src="https://static1.pocketlintimages.com/wordpress/wp-content/uploads/151331-tv-feature-what-is-the-best-order-to-watch-the-rocky-movies-image1-y39ixawpmf.jpg" />
     
     </div>
      
    
      <div className='border-b border-gray-300'/>
      
     <div className='max-w-6xl  mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
            {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
      
      
       </div>
   
   
      
   
   
   
   
   
  
  )
}
