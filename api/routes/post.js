import express from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { Create, getPosts } from '../controlers/post.js'

const router = express.Router() 

router.post("/create",verifyToken,Create)
router.get("/getposts",getPosts)





export default router