import{BrowserRouter,Routes,Route} from 'react-router-dom'


import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashborad from './pages/Dashborad'
import Projects from './pages/Projects'
import Header from './componets/Header'



export default function App() {
  return (
    <BrowserRouter>
      <Header/>
   <Routes>

       <Route path='/'  element={<Home/>}/>
      
       <Route path='/about'  element={<About/>}/>

       <Route path='/signin'  element={<SignIn/>}/>
        
       <Route path='/signup'  element={<SignUp/>}/> 

       <Route path="/dashbord" element={<Dashborad/>} />

       <Route path="/projects" element={<Projects/>} />
  
  
  
   </Routes>
   
   
   
   
    </BrowserRouter>
  )
}

