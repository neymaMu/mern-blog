import mongoose from 'mongoose'

const postScehma = new mongoose.Schema({


    userId:{
    type:String,
    required:true
},

  content:{
    type:String,
    required:true
  },

  title:{
    type:String,
    required:true,
    unique:true
  },

  image:{
    type:String,
    default:"https://blog.hubspot.com/hs-fs/hubfs/best-time-to-post-on-instagram-3.jpg?width=595&height=400&name=best-time-to-post-on-instagram-3.jpg"
  },

  category:{
    type:String,
    default:"uncategorized"
  },

  slug:{
    type:String,
    required:true,
    unique:true
  }



},{timestamps:true}) 


const Post = mongoose.model("Post",postScehma)

export default Post