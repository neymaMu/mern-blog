import expres from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { DeleteUse, updateUser } from '../controlers/user.js'



const router = expres.Router() 




router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,DeleteUse)


export default router