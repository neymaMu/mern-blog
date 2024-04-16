import express from 'express' 
const router = express.Router() 
import { verifyToken } from '../utils/verifyUser.js'
import { createComent, getComent } from '../controlers/coment.js'





router.post("/create",verifyToken,createComent)
router.get("/getcoment/:postId",getComent)








export default router
