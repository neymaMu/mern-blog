import React, { useEffect, useRef, useState } from 'react'
import{useSelector } from 'react-redux'
import{Alert, Button, TextInput} from 'flowbite-react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import{app} from '../firbase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart,updateSuccess,updateFalier } from '../redux/user/userSlice'
import{useDispatch} from 'react-redux'
 

export default function DashProfile() {
 
 
    const{currentUser} = useSelector((state) => state.user)
 
 
    const[imageFile,setImageFile] = useState(null)
    const[imageUrl,setImageUrl] = useState(null)
    const[imageProgress,setImageProgress] = useState(null)
    const[imageError,setImageError] = useState(null)
    
    const[imageuploding,setImageuploding] = useState(false)

    const[updateUsersuccses,setUpdateUsersuccses] = useState(false)
    
    const[updateUserError, setUpdateUserError] = useState(null)
    
    
    const[formData, setFormData] = useState({})
   
   
    const dispatch = useDispatch()
    
    
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
      setImageuploding(true)
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
       setImageuploding(false)
       
        },

       () => {
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => { setImageFile(downloadURL)
          setFormData({ ...formData, profilePicture:downloadURL})
          setImageuploding(false)
         })
       }
   )
      
   }
   
   
   
const handleChange = (e) =>{

 setFormData({ ...formData,[e.target.id]: e.target.value})

}
   

    
   const handleSubmit =async (e) =>{
    e.preventDefault();
     
  
  
  setUpdateUserError(null)
  setUpdateUsersuccses(null)
  
    if(Object.keys(formData).length === 0){
     
     setUpdateUserError('no changes made')
      return
     }

  if(imageuploding){
    setUpdateUserError('please wait the file to update')
    return
  }
    try{
     dispatch(updateStart())
     const res = await fetch(`http://localhost:5000/api/user/update/${currentUser._id}`,{
    
     method:"PUT",
     credentials: 'include',
     headers:{
      'Content-Type': 'application/json',
     },
     body:JSON.stringify(formData)
    
     })
    
      const data = await res.json()
      
        if(!res.ok){
        dispatch(updateFalier(data.message))
        setUpdateUserError(data.message)
      }
      
      else{
        dispatch(updateSuccess(data))
        setUpdateUsersuccses('User updated succssfully')

      }
    
    }
    catch(error){
     dispatch(updateFalier(error.message))
     setUpdateUserError(false)
    }
  
 
}
   
   
   
   
      return (
    <div className='  max-w-lg mx-auto w-full  p-6 cursor-pinter'>
      
      <h1 className='my-7 text-center font-semibold text-3xl md:w-full  md:ml-60'>Profile</h1>

       <div className='flex w-full mx-auto'>
      
       
         <form onSubmit={handleSubmit} className='flex flex-col md:ml-80 gap-3 '>
         
       
       <input hidden type="file"   onChange={handleimagechange} ref={filePickerRef}/>
       
       
       
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
        
        
         {updateUsersuccses&& <Alert >{updateUsersuccses}</Alert>}
   
   
   {updateUserError && <Alert >{updateUserError}</Alert>}
       
       
       
        <TextInput className='w-80' id="username" type="text" placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
       
        <TextInput className='w-90' id="email" type="email" placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
         
        <TextInput className='w-80' id="passowrd" type="password" placeholder='password' onChange={handleChange} />
        
        
        
        
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
