import React, { useEffect, useRef, useState } from 'react'
import{useSelector } from 'react-redux'
import{Alert, Button, TextInput} from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import{app} from '../firbase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function DashProfile() {
 
 
    const{currentUser} = useSelector(state => state.user)
 
 
    const[imageFile,setImageFile] = useState(null)
    const[imageUrl,setImageUrl] = useState(null)
    const[imageProgress,setImageProgress] = useState(null)
    const[imageError,setImageError] = useState(null)
  
   
    console.log(imageError,imageProgress)
    
    
    
    const filePickerRef = useRef()
    
    
    
    const handleimagechange = (e) => {
     const file = e.target.files[0]
     
     if(file){
      setImageFile(file)
      setImageUrl(URL.createObjectURL(file))
     }
    }
    
   
    useEffect(() => {
    if(imageFile){
      uploadimage()
    }

    },[imageFile])
   
    
    
    
    const  uploadimage = async() =>{
      setImageError(null)
      const storage = getStorage(app)
      const filename = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, filename)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)
      
      uploadTask.on(
       'state_changed',
       (snapshot) =>{
         const progress = 
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         setImageProgress(progress.toFixed(0))
       },
        
       (error)=>{
           setImageError("could not upload the image")
       
       
       setImageFile(null)
       setImageUrl(null)
       
        },

       () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { setImageFile(downloadURL)
         })
       }
   )
      
   }
   
   
   

   
  
    
   
   
   
   
   
   return (
    <div className='  max-w-lg mx-auto w-full  p-6 cursor-pinter'>
      
      <h1 className='my-7 text-center font-semibold text-3xl md:w-full  md:ml-60'>Profile</h1>

       <div className='flex w-full mx-auto'>
      
       
         <form className='flex flex-col md:ml-80 gap-3 '>
         
       
       <input hidden type="file"    onChange={handleimagechange} ref={filePickerRef}/>
       
       
       
         <div  onClick={() => filePickerRef.current.click()} className='w-25 h-25 relative  self-center cursor-pointer  shadow-md overflow-hidden rounded-full'>
       
    
       
        
        {imageProgress &&  <CircularProgressbar
              value={imageProgress || 0}
              text={`${imageProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageProgress / 100
                  })`,
                },
              }}
             />}
        
        
        
        
        
        
        
         <img alt="user" src={imageUrl || currentUser.profilePicture}   className='rounded-full  object-cover  h-full w-full border-8 border-[lightgray]'  />
   
         
         </div> 
         {imageError && <Alert>{imageError}</Alert>}
        
        
        <TextInput className='w-80' id="username" type="text" placeholder='username' defaultValue={currentUser.name}/>
       
        <TextInput className='w-90' id="email" type="email" placeholder='email' defaultValue={currentUser.email}/>
         
        <TextInput className='w-80' id="passowrd" type="password" placeholder='password' defaultValue={currentUser.password}/>
        
        
        
        
         <Button type="submit" gradientDuoTone='purpleToBlue' outline>update</Button>
         
         <div className='flex justify-between text-red-500 mt-4'>
                <span className='font-bold'>Delete Account</span>
                <span className='font-bold'>Sign Out</span>
             </div>
         
         </form>
      </div>


   
   
   
   
   
   
   
    </div>
  )
}
