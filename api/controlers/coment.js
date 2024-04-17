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

//edit coment 

export const Editcoment = async(req,res,next)=>{

  try{

     const coment = await Comment.findById(req.params.comentId)
      if(!coment){
        return next(errorHandler(404 ,"can find coment"))
      }
    
        if(coment.userId !== req.user.id && !req.user.isAdmin){
          return next(errorHandler(403,"you are not allwoed to edit this coment"))
        }
  
     const editComent = await Comment.findByIdAndUpdate(req.params.comentId,{content:req.body.content},{new:true})
     
     res.status(200).json(editComent)
        
    }
 catch(error){
    next(error)
  }
} 


//delete coment 

export const Deletecoment = async(req,res,next) => {

  try{

const coment = await Comment.findById(req.params.comentId)
if(!coment){
  return next(errorHandler(404,"no coment"))
}

  if(coment.userId !== req.user.id && !req.user.isAdmin){
    return next(errorHandler(403,"you are not alowed to delet the coment"))
  }
  await Comment.findByIdAndDelete(req.params.comentId)
  
  

res.status(200).json('coment delete')


}
  catch(error){
    next(error)
  }
} 


export const getcomments = async (req, res, next) => {
  if (!req.user.isAdmin)
    return next(errorHandler(403, 'You are not allowed to get all comments'));
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'desc' ? -1 : 1;
    const comments = await Comment.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalComments = await Comment.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthComments = await Comment.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ comments, totalComments, lastMonthComments });
  } catch (error) {
    next(error);
  }
};