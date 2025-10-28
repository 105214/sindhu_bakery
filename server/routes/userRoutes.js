import e from 'express'
import { UserLogin, userSignup } from '../controllers/userController.js'


const router=e.Router()


// sign up
router.post("/signup",userSignup)

// login
 router.put('/login',UserLogin)

// // profile
// router.get('/profile')

// // profile-edit
// router.put('/update')

// // profile deactive
// router.put('/deactive')

// // logout
// router.put("/logout")

// password-forgot

// address update

// check user

export {router as userRouter}
