import mongoose, { Schema } from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            
        },

        adminId:{
            type:Schema.Types.ObjectId,
            ref:"Admin"
        },
        products:[{

            productId:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true,

            },
            title:{

                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,

            },
            quantity:{
                type:Number,
                required:true,
                min:1,
            },
           
        }],
         mobile:{
                type:String,
                required:true,
            },
            totalAmount:{
                type:Number,
                required:true,
            },
            status:{
                type:String,
                enum:["pending","completed","cancelled"],
                default:"pending",
            },
            paymentMethod:{
                type:String,
                enum:["Cash_On_Delivery","Online"],
                default:"Cash_On_Delivery"
            },
            paymentStatus:{
                type:String,
                enum:["pending","paid","failed"],
                default:"pending"
            }



    },
    {timestamps:true}
)

export const Order = mongoose.model("Order",orderSchema)