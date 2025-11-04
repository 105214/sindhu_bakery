import e from 'express'

import { createProduct, getAllProduct, productDetails } from '../controllers/productController.js'
import { authUser } from '../midllewares/authUser.js'
import { authAdmin } from '../midllewares/authAdmin.js'
import { upload } from '../midllewares/multer.js'


const router=e.Router()


 router.get("/productlist",getAllProduct)

 router.get('/product-details/:productId',authUser,productDetails)

router.post('/add-product',authAdmin,upload.single("image"),createProduct)


export {router as productRouter}
