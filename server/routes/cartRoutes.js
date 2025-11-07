import e from 'express'
import { authUser } from '../midllewares/authUser.js'
import { addProductToCart, getCart, removeProductFromCart } from '../controllers/cartController.js'

const router = e.Router()


router.get("/cart",authUser,getCart)

router.post("/add-cart",authUser,addProductToCart)

router.post("/cart-add-product"/authUser,addProductToCart)

router.delete("delete-cart",authUser,removeProductFromCart)
export  {router as cartRouter}