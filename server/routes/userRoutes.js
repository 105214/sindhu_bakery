import e from 'express'
import { UserLogin, userLogout, userProfile, userProfileUpdate, userSignup } from '../controllers/userController.js'
import { authUser } from '../midllewares/authUser.js'


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
// router.put('/deactive')

// // logout
 router.put("/logout",userLogout)

// password-forgot

// address update

// check user

export {router as userRouter}
