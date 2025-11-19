import e from 'express';
import {userRouter} from './userRoutes.js'
import { adminRouter } from './adminRoutes.js';
import { productRouter } from './productRoutes.js';
import { cartRouter } from './cartRoutes.js';
import { reviewRouter } from './reviewRoutes.js';
import { orderRoutes } from './orderRoutes.js';

const router = e.Router()

router.use("/user",userRouter);

router.use("/admin",adminRouter)

router.use('/product',productRouter)

router.use("/cart",cartRouter)

router.use('/review',reviewRouter)

router.use('order',orderRoutes)
export {router as apiRouter} 