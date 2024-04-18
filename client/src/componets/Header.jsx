import React from 'react'
import{Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react'
import { Link,useLocation,useNavigate  } from 'react-router-dom'
import flag from '../assets/flag.jpg'
import { IoSearchOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import{useSelector } from 'react-redux'
import {  useDispatch} from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { ImSun } from "react-icons/im";
import { signoutSuccess } from '../redux/user/userSlice'

import { useEffect, useState } from 'react';

export default function Header() {
 
 const path = useLocation().pathname
   

 const location = useLocation();
 
 
 const{currentUser} = useSelector(state => state.user)
   
  const{theme} = useSelector(state => state.theme)
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch()
 
 

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);



  const navigate = useNavigate();
  const handlesignout =async () =>{

    try{
   const res = await fetch('https://mern-blog-kdbu.onrender.com/api/user/signout',{
    method:"POST"
   })

    const data = await res.json()

    if(!res.ok){
      console.log(data.message)
    }
  
  else{
   dispatch(signoutSuccess())
  }
     
  
  }
    catch(error){
      console.log(error)
    }
    }
 
 
    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    };
 
 
 
 
 
 
  return (
    
    <Navbar className='border-b-2 '>
    
      <Link to="/" className='flex justify-between items-center whitespace-nowrap   '> 
      
      <span className='font-extrabold text-lg text-md text-red-400 dark:text-white '>Fitness Club</span>
    
      <img src={flag} className='w-10 h-10 object-contain rounded-md  '/>

     </Link>
    
    
   <form onSubmit={handleSubmit}>

    <TextInput 
    
    type="text"
    placeholder='Search Here'
    rightIcon={IoSearchOutline}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className='hidden lg:inline'
    
    />
   </form>
   
   
   
   <Button className='w-12 h-10 lg:hidden' color="gray" pill>
   <IoSearchOutline/>
   </Button> 
   
   
   
   <div className='flex gap-2 md:order-2'>

  <Button className='w-12 h-10 hidden sm:inline' color="gray" pill onClick={() => dispatch(toggleTheme())}>
 
  {theme === 'light'? <ImSun /> :   <IoMoonOutline />}
  
  

  
  </Button>
 
  {currentUser ? <Dropdown  inline arrowIcon={false} label={<Avatar alt='user' img={currentUser.profilePicture} rounded />} >


    <Dropdown.Header>
      <span className='block text-sm'>@{currentUser.username}</span>
      <span className='block font-bold truncate'>{currentUser.email}</span>
    </Dropdown.Header>
 
 
    <Link to="/dashbord?tab=profile">
    <Dropdown.Item>
      Profile
    </Dropdown.Item>
     </Link>
 
 
    <Dropdown.Divider/> 

    <Dropdown.Item onClick={handlesignout}>Sign Out</Dropdown.Item>
 
 
 
  </Dropdown> 
  
  
  :  <Link to="/signin">
   
   <Button gradientDuoTone="purpleToBlue" outline color="gray" pill>
   
  
    Sign In
   </Button>
 
 
   </Link>}
 
 

  
  
  
  
  
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
