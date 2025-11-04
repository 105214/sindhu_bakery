import { Cart } from "../models/cartModel.js"
import { Product } from "../models/productModel.js"


export const getCart = async (req,res)=>{
    try {
        const userId = req.user.id

        const cart = await Cart.findOne({userId}).populate("products.productId")

        if(!cart){
            return res.status(404).json({message:"cart not found"})
        }

        res.status(200).json({data:cart,message:"cart fetched"})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
}


export const addProductToCart = async(req,res,next)=>{
        try {
            
            const userId = req.user.id
            const  {productId}=req.body

            const product = await Product.findById(productId)

            if(!product){
                return res.status(404).json({message:"product not found"})
            }

            let cart = await Cart.findOne({userId})

            if(!cart){
                cart=new Cart({userId,products:[]})
            }
        } catch (error) {
            
        }
}