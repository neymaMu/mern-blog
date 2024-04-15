import express from 'express' 
const router = express.Router() 
import { verifyToken } from '../utils/verifyUser.js'
import { createComent } from '../controlers/coment.js'





router.post("/create",verifyToken,createComent)








export default router
