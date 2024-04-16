import expres from 'express' 
import { verifyToken } from '../utils/verifyUser.js'
import { DeleteUse, Getuser, getUsers, signout, updateUser } from '../controlers/user.js'



const router = expres.Router() 




router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,DeleteUse)
router.post("/signout",signout)
router.get("/getuser",verifyToken,getUsers)
router.get("/:userId",Getuser)


export default router