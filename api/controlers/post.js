import Post from "../models/post.js"
import { errorHandler } from "../utils/error.js"

  
  
  export const Create =async (req,res,next) =>{

  
     if(!req.user.isAdmin){
    return next(errorHandler(403,"you are not allowed to create a post"))
     }

     if(!req.body.title || !req.body.content){
           return next(errorHandler(400,"please provide all the fields"))
     }

     const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')


     const NewPost = new Post({...req.body,slug,userId:req.user.id})

   try{
  const savedPost = await NewPost.save() 

  res.status(201).json(savedPost)

   }
   catch(error){
    next(error)
   }
   
    }


    //get posts 
    
    
    export const getPosts = async(req,res,next) =>{

      try{

      const startIndex = parseInt(req.query.startIndex) || 0 
      const limit = parseInt(req.query.limit) || 9   
      const sortDirection = req.query.order === 'asc' ? 1 : -1 
       
        const posts = await Post.find({
        ...(req.query.userId &&{userId:req.query.userId}),
        ...(req.query.category &&{category:req.query.category}),
        ...(req.query.slug && {slug:req.query.slug}),
        ...(req.query.postId && {_id:req.query.postId}), 
        ...(req.query.searchTerm && { 
        $or:[
         
          {title:{$regex:req.query.searchTerm,$options:"i"}},
          {content:{$regex:req.query.searchTerm,$options:"i"}},
           ],
       }),
       })
    
       .sort({updatedAt:sortDirection})
       .skip(startIndex)
       .limit(limit)
    
    const totalposts = await Post.countDocuments()
    
    
       const now = new Date() 


       const oneMonthGo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
       )
  
       const lasmonthpost = await Post.countDocuments({
         createdAt:{$gte:oneMonthGo}
      })
  
        res.status(200).json({posts,totalposts,lasmonthpost})
        }
      catch(error){
        next(error)
      }
    }


