import React from 'react'
import{Button, FileInput, Select, TextInput} from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  



   export default function CreatePost() {
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

           <FileInput type="file" accept='image/*' />
           <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline>upload image</Button>

           </div>
         
         
         
         
           <ReactQuill required placeholder='Write Somthing' className='h-72 mb-12'/>
           
           
           <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
           
            </form>
       
       
       
       
       
       
       </div>
  )
}
