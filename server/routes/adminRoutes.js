import e from 'express'
import { adminLogin, adminSignup } from '../controllers/adminController.js'


const router=e.Router()


// sign up
router.post("/signup",adminSignup)

// // login
 router.put('/login',adminLogin)

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

export {router as adminRouter}