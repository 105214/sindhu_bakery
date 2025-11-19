import e from 'express'
import { authAdmin } from '../midllewares/authAdmin.js'
import { addOrder, deleteOrder, updateOrder } from '../controllers/orderController.js'
import { authUser } from '../midllewares/authUser.js'


const router = e.Router()

// admin Order Route
router.post('/add-order',authAdmin,addOrder)


// user order route

router.post('/new-order',authUser, addOrder)

// Delete order

router.delete('/order-delete',authAdmin,deleteOrder)

// Update Order

router.put('/order-update',authAdmin,updateOrder)



export {router as orderRoutes}