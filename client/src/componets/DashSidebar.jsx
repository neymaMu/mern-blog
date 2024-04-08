import{Sidebar, SidebarItem} from 'flowbite-react'
import { HiUser,HiArrowRight  } from "react-icons/hi";
import React, { useEffect, useState } from 'react'
import{Link, useLocation} from 'react-router-dom'



export default function DashSidebar() {
 
   
   
    const location = useLocation()
 
 const[tab, setTab] = useState("")
 
 
 useEffect(() => {
   
  const urlParams = new URLSearchParams(location.search)
  const tabFormUrl = urlParams.get('tab')
    
  if(tabFormUrl){
    setTab(tabFormUrl)
  }
  },[location.search])
 
   
   
   
   
   
   
   
    return (
  
   <Sidebar className='w-full md:w-56'>

   <Sidebar.Items>

   <Sidebar.ItemGroup>

    <Link to="/dashbord?tab=profile">
    <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"user"} labelColor='dark' >

        Profile
    </Sidebar.Item>
  </Link>
   
   
   
   
   
    <Sidebar.Item  icon={HiArrowRight} className="cursor-pointer">
       Sign Out
        
    </Sidebar.Item>
  
  
  
   </Sidebar.ItemGroup>

   </Sidebar.Items>
  
    </Sidebar>



  )
}
