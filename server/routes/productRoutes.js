import e from 'express'
import { UserLogin, userLogout, userProfile, userProfileUpdate, userSignup } from '../controllers/userController.js'
import { authUser } from '../midllewares/authUser.js'


const router=e.Router()


// router.get("/productlist")

export {router as productRouter}
