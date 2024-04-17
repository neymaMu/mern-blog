import React from 'react'
import { Link } from 'react-router-dom'





export default function PostCard({pos}) {
 
    return (
    <div className='group transition-all  relative w-full h-[330px] border border-teal-500 hover:border-2 overflow-hidden rounded-lg sm:w-[430px]'>

   <Link to={`/post/${pos.slug}`}>
   
    <img src={pos.image}  className='h-[230px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20'/>
    
    <div className='p-3 flex flex-col gap-2'>
        <p className='font-bold text-lg line-clamp-2'>{pos.title}</p>
        <span className='italic text-sm'>{pos.category}</span>
   
         <Link to={`/post/${pos.slug}`}
          className='z-10 group-hover:bottom-0 absolute 
          bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 
          hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
         Read More
         </Link>
   
    </div>
  
  
  
   </Link>

    </div>
  )
}