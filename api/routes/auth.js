import express from 'express'
import { SignIn, Signup } from '../controlers/auth.js'


const router = express.Router() 

router.post("/signup",Signup)

router.post("/signIn",SignIn)


export default router