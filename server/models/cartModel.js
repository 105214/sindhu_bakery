import mongoose, { Schema } from "mongoose";



const cartSchema= new mongoose.Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        products:[
            {
                productId:{
                    type:Schema.Types.ObjectId,
                    ref:"Product",
                    required:true,
                },
                price:{
                    type:Number,
                    required:true,
                },
                quantity:{
 
                    type:Number,
                    required:true,
                }
            } 

        ],
        totalPrice:{
            type:Number,
            required:true,
            default:0,
        },

        
    },
   {timestamps:true}, 
  
)

 cartSchema.methods.calculateTotalPrice = function (){
    this.totalPrice = this.products.reduce((total,product)=>total+product.price,0)
   }


   export const Cart =mongoose.model("Cart",cartSchema)