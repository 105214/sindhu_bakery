import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
            title:{
                type:String,
                required:true,
                maxLength:50
            },
            description:{
                type:String,
                required:true,

            },
            quantity:{
                type:Number,
                required:true,


            },
            price:{
                type:Number,
                required:true,
                maxLength:10,
            },
            image:{
                type:String,
                required:true,
            },
            admin:{type: mongoose.Types.ObjectId, 
                ref:"Admin"},
    },
    {timestamps:true}
)

export const Product =mongoose.model("Product",productSchema)