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
import UpdatePost from './pages/UpdatePost'
import PostPage from './componets/PostPage'
import ScrollToTop from './componets/ScrollToTop'
import Search from './componets/Search'





export default function App() {
  return (
    <BrowserRouter>
   
   <ScrollToTop/>
   
      <Header/>
   <Routes>

       <Route path='/'  element={<Home/>}/>
      
       <Route path='/about'  element={<About/>}/>

       <Route path='/signin'  element={<SignIn/>}/>
        
       <Route path='/signup'  element={<SignUp/>}/> 
       
      
            <Route element={<OnlyAdminRoute/>}> 
            <Route  path="/createpost" element={<CreatePost/>} />

            <Route path="/update/:postId" element={<UpdatePost/>} />
            
             </Route>
      
      
       <Route element={<PrivateRoute/>}>
       <Route path="/dashbord" element={<Dashborad/>} />

      </Route>
      
       <Route path="/projects" element={<Projects/>} /> 
       <Route path='/search' element={<Search/>} />
       
       <Route path="/post/:postSlug" element={<PostPage/>} />
  

  
   </Routes>
   
   
 <Footer/>
   
    </BrowserRouter>
  )
}

