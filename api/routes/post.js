import express from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { Create } from '../controlers/post.js'

const router = express.Router() 

router.post("/create",verifyToken,Create)





export default router