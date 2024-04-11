import{Sidebar, SidebarItem} from 'flowbite-react'
import { HiUser,HiArrowRight  } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import{Link, useLocation} from 'react-router-dom'

import { signoutSuccses } from '../redux/user/userSlice'
import {  useDispatch} from 'react-redux'


export default function DashSidebar() {
 
   
  const dispatch = useDispatch()
   
  const location = useLocation()
 
 const[tab, setTab] = useState("")
 
 
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

   <Sidebar.ItemGroup>

    <Link to="/dashbord?tab=profile">
    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"user"} labelColor='dark' as='div'>

        Profile
    </Sidebar.Item>
  </Link>
   
   
   
   
   
    <Sidebar.Item onClick={handlesignout}  icon={HiArrowRight} className="cursor-pointer">
       Sign Out
        
    </Sidebar.Item>
  
  
  
   </Sidebar.ItemGroup>

   </Sidebar.Items>
  
    </Sidebar>



  )
}
