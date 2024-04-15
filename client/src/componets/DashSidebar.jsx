import{Sidebar, SidebarItem} from 'flowbite-react'
import { HiUser,HiArrowRight  } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import{Link, useLocation} from 'react-router-dom'

import { signoutSuccses } from '../redux/user/userSlice'
import {  useDispatch} from 'react-redux'
import { MdOutlinePostAdd } from "react-icons/md";
import{useSelector} from 'react-redux'
import { FaUsers } from "react-icons/fa";


export default function DashSidebar() {
 
   
  const dispatch = useDispatch()
   
  const location = useLocation()
 
 const[tab, setTab] = useState("")
 
   const{currentUser} = useSelector((state) => state.user)
 
 useEffect(() => {
   
  const urlParams = new URLSearchParams(location.search)
  const tabFormUrl = urlParams.get('tab')
    
  if(tabFormUrl){
    setTab(tabFormUrl)
  }
  },[location.search])
 
   
   
   
   
   
  const handlesignout =async () =>{

    try{
   const res = await fetch('http://localhost:5000/api/user/signout',{
    method:"POST"
   })

    const data = await res.json()

    if(!res.ok){
      console.log(data.message)
    }
  
  else{
   dispatch(signoutSuccses())
  }
     
  
  }
    catch(error){
      console.log(error)
    }
    }
   
   
  
  
  
  
  
  
  
  
  return (
  
   <Sidebar  className='w-full md:w-56'>

   <Sidebar.Items>

   <Sidebar.ItemGroup className='flex flex-col gap-3'>

    <Link to="/dashbord?tab=profile">
    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? "admin" : "user"} labelColor='dark' as='div'>

        Profile
    </Sidebar.Item>
     </Link>
       
       {currentUser.isAdmin && <Link to="/dashbord?tab=posts">
       <Sidebar.Item active={tab === 'posts'} as="div" icon={MdOutlinePostAdd}>
        posts
       </Sidebar.Item>
       
       
       </Link> }
      
   
   
       {currentUser.isAdmin && <Link to="/dashbord?tab=users">
       <Sidebar.Item active={tab === 'users'} as="div" 
       icon={FaUsers }>
       users
       
       </Sidebar.Item>
       
       
       </Link> }
      
   
   
    
    
    
    
    
    <Sidebar.Item onClick={handlesignout}  icon={HiArrowRight} className="cursor-pointer">
       Sign Out
        
    </Sidebar.Item>
  
  
  
   </Sidebar.ItemGroup>

   </Sidebar.Items>
  
    </Sidebar>



  )
}
