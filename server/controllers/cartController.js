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
// find the product
            const product = await Product.findById(productId)

            if(!product){
                return res.status(404).json({message:"product not found"})
            }
// find the users cart.if it doesn't exist create new one
            let cart = await Cart.findOne({userId})

            if(!cart){
                cart=new Cart({userId,products:[]})
            }

// check if the product is already in the cart

        const productExist=cart.products.some((item)=>item.productId.equals(productId))

        if(productExist){
            return res.status(400).json({message:"product already in the cart"})
        }

        // add product to cart
        cart.products.push({
            productId,
            price:product.price,
        })

        // recalculate total price
        cart.calculateTotalPrice()

        await cart.save()

        res.status(200).json({data:cart,messsage:"product added to cart"})
        } catch (error) {
            res.status(500).json({message:"internal server error",error})
        }
}


export const removeProductFromCart = async(req,res,next)=>{
    try {
        
        const userId=req.user.id
        const {prodctId} = req.body
        
        // find the users cart
        let cart=await Cart.findOne({userId})

        if(!cart){
            return res.status(404).json({message:"cart not found"})
        }

        // remove product from cart
        cart.products = cart.products.filter((item)=>!item.productId.equals(productId))


        // recalculate total price
        cart.calculateTotalPrice()


        // save the cart
        await cart.save()

        res.status(200).json({data:cart,message:"course removed from cart"})

    } catch (error) {
        
        res.status(500).json({message:"internal server error",error})
    }
}