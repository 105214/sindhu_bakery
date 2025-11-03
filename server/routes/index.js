import e from 'express';
import {userRouter} from './userRoutes.js'
import { adminRouter } from './adminRoutes.js';
import { productRouter } from './productRoutes.js';

const router = e.Router()

router.use("/user",userRouter);

router.use("/admin",adminRouter)

router.use('/product',productRouter)

export {router as apiRouter}