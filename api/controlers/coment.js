import { errorHandler } from "../utils/error.js"
import Comment from "../models/coment.js" 
 
 
 
 export const createComent =async (req,res,next) => {

    try{
   
        const{content,postId,userId} = req.body 

        if(userId !== req.user.id){
            return next(errorHandler(403,"cant post a comment"))
        }


     const Newcoment = new Comment({content,postId,userId})
    
      await Newcoment.save()

   res.status(200).json(Newcoment)
    
    }
    catch(error){
        next(error)
    }
 } 


 //get comment 

 export const getComent = async(req,res,next) => {

    try{

   const coment = await Comment.find({postId:req.params.postId}).sort({createdAt:-1})

    res.status(200).json(coment)
    
    
    }
    catch(error){
        next(error)
    }
 } 


 //like the comment 

 export const likeComent =async (req,res,next) => {

  try{

 const coment = await Comment.findById(req.params.comentId)
  
  if(!coment){
    return next(errorHandler(404,"no coment"))
  }


const userIndex = coment.likes.indexOf(req.user.id)

  if(userIndex === -1){
    coment.numberOflikes +=1
    coment.likes.push(req.user.id)
  }

  else{
    coment.numberOflikes -=1
    coment.likes.splice(userIndex, 1)
  }
    
await coment.save() 
res.status(200).json(coment)


}
  catch(error){
    next(error)
  }
 
}