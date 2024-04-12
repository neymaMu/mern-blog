import{BrowserRouter,Routes,Route} from 'react-router-dom'


import React from 'react'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashborad from './pages/Dashborad'
import Projects from './pages/Projects'
import Header from './componets/Header'
import Footer from './componets/Footer'
import PrivateRoute from './componets/PrivateRoute'
import OnlyAdminRoute from './componets/OnlyAdminRoute'
import CreatePost from './pages/CreatePost'





export default function App() {
  return (
    <BrowserRouter>
      <Header/>
   <Routes>

       <Route path='/'  element={<Home/>}/>
      
       <Route path='/about'  element={<About/>}/>

       <Route path='/signin'  element={<SignIn/>}/>
        
       <Route path='/signup'  element={<SignUp/>}/> 
       
      
            <Route element={<OnlyAdminRoute/>}> 
            <Route  path="/createpost" element={<CreatePost/>} />

            </Route>
      
      
       <Route element={<PrivateRoute/>}>
       <Route path="/dashbord" element={<Dashborad/>} />

      </Route>
      
       <Route path="/projects" element={<Projects/>} />
  

  
   </Routes>
   
   
 <Footer/>
   
    </BrowserRouter>
  )
}

