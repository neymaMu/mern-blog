import React, { useState } from 'react'
import{Alert, Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firbase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


     



    export default function CreatePost() {
    
    const[file,setFile] = useState(null)
   
    const[imageProgress,setImageProgress] = useState(null)
   
    const[imageError,setImageError] = useState(null)
    
    const[formData,setFormData] = useState({})
   
   
   
   
    const handleuploadimage = async() =>{

       try{

         if(!file){
          setImageError('please select an image')
       
          return
      }
       setImageError(null)
      const storage = getStorage(app)
      const fileName = new Date().getTime() + '-' + file.name
      
      const storageRef = ref(storage,fileName)
      const uploadTask = uploadBytesResumable(storageRef,file)
      
      uploadTask.on(
        'state_changed',
        (snapshot)=>{
          const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setImageProgress(progress.toFixed(0))
        },

        (error)=>{
          setImageError('image upload faild')
          setImageProgress(null)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageProgress(null)
            setImageError(null)
            setFormData({ ...formData,image:downloadURL})
          })
        }
       )
    }
        catch(error){
        console.log(error)
       }
     }
    
    
    
    
    return (
    
    
    <div className='p-3  max-w-3xl  mx-auto min-h-screen'>
       
        <h1 className='text-center text-2xl font-extrabold'>Create a Post</h1>

        <form className='flex my-2  flex-col gap-3'>
           
           <div className='flex flex-col gap-4 sm:flex-row justify-between'>

            <TextInput type="text" placeholder='Title' required id="title" className='flex-1'/>

             <Select>
             <option value='uncategorized'> Select a category</option>

             <option value='fullBody'> full Body</option>
            
             <option value='upperBody'> Upper Body</option>

             <option value='LowerBody'> Lower Body</option>
          
             </Select>
           
            </div>


         
           <div className='flex gap-4 justify-between items-center border-1 border-teal-500 border-dotted p-3'>

           <FileInput type="file" accept='image/*'  onChange={(e) => setFile(e.target.files[0])}/>
           
           <Button disabled={imageProgress} onClick={handleuploadimage} type="button" gradientDuoTone="purpleToBlue" size="sm" outline>
           
           {
            imageProgress ? 
            <div className='w-16 h-16'>
              <CircularProgressbar value={imageProgress} text={`${imageProgress || 0}%`}/>
            </div>
           
           :'upload Image'}
         
         
           </Button>

           </div>
         
         
         {imageError && <Alert color="failure">{imageError}</Alert>}
         
           
           {formData.image && <img src={formData.image} alt='upload' className='w-full h-72 object-cover'/> }
           
           
           <ReactQuill required placeholder='Write Somthing' className='h-72 mb-12'/>
           
           
           <Button type="submit" gradientDuoTone="purpleToPink">Publish
           
           
           
           </Button>
           
            </form>
       
       
       
       
       
       
       </div>
  )
}
