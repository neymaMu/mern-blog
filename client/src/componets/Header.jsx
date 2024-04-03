import React from 'react'
import{Button, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation } from 'react-router-dom'
import flag from '../assets/flag.jpg'
import { IoSearchOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";


export default function Header() {
 
 const path = useLocation().pathname
    return (
    
    <Navbar className='border-b-2 '>
    
      <Link to="/" className='flex justify-between items-center whitespace-nowrap   '> 
      
      <span className='font-extrabold text-lg text-md text-red-400 dark:text-white '>Fitness Club</span>
    
      <img src={flag} className='w-10 h-10 object-contain rounded-md  '/>

     </Link>
    
    
   <form>

    <TextInput 
    
    type="text"
    placeholder='Search Here'
    rightIcon={IoSearchOutline}
    
    className='hidden lg:inline'
    
    />
   </form>
   
   
   
   <Button className='w-12 h-10 lg:hidden' color="gray" pill>
   <IoSearchOutline/>
   </Button> 
   
   
   
   <div className='flex gap-2 md:order-2'>

  <Button className='w-12 h-10 lg:hidden' color="gray" pill>
 
  <IoMoonOutline />
  
  </Button>
 
    <Link to="/signin">
 
   <Button gradientDuoTone="purpleToBlue" color="gray" pill>

    Sign In
   </Button>
 
 
   </Link>

   <Navbar.Toggle/>
   
   
   </div>
   
   
   
   
   <Navbar.Collapse>
 
 <Navbar.Link active={path === "/"} as={"div"}>
    <Link to="/">Home</Link>
 </Navbar.Link>
 
 <Navbar.Link active={path === "/about"} as={"div"}>
    <Link to="/about">About</Link>
 </Navbar.Link>


 <Navbar.Link active={path === "/projects"} as={"div"}>
    <Link to="/projects">Projects</Link>
 </Navbar.Link>


  </Navbar.Collapse>
   
   
  
  
  
    </Navbar>
  )
}
