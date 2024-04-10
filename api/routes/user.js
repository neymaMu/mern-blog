import expres from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { updateUser } from '../controlers/user.js'



const router = expres.Router() 




router.put("/update/:userId",verifyToken,updateUser)


export default router