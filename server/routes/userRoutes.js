import e from 'express'
import { checkUser, UserLogin, userLogout, userProfile, userProfileUpdate, userSignup } from '../controllers/userController.js'
import { authUser } from '../midllewares/authUser.js'
import { authAdmin } from '../midllewares/authAdmin.js'


const router=e.Router()


// sign up
router.post("/signup",userSignup)

// login
 router.put('/login',UserLogin)

//  profile
 router.get('/profile',authUser,userProfile)

// // profile-edit
router.put('/update',authUser,userProfileUpdate)

// // profile deactive
 router.put('/deactive/:userId',authAdmin)

// // logout
 router.put("/logout",userLogout)

// password-forgot

// address update

// check user
router.get("/check-user",authUser,checkUser)

export {router as userRouter}
