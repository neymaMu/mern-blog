import expres from 'express' 
import { text } from '../controlers/user.js'
const router = expres.Router() 


router.get("/test",text) 


export default router