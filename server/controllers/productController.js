import { cloudinaryInstance } from "../config/cloudinary.js"
import { Product } from "../models/productModel.js"


export const getAllProduct = async(req,res,next)=>{
    try {
        const productList=await Product.find().select("-description")

        res.json({data:productList,message:"All displayed"})
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
    }

}



export const productDetails = async (req,res,next)=>{
    try {
        
        const productId = req.params

        const productList = await Product.findById(productId);
        res.json({data:productList,message:"product displayed"})
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
    }
}


export const createProduct = async (req,res,next)=>{
    try {
        const {title, description,quantity,price,image}=req.body
        const adminId = req.user.id
console.log(adminId)
if(!title || !quantity || !price){

     return res.status(400).json({message:"all fields required"})
}

if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // const imagePath = req.file.filename; 
const cloudinaryRes=await cloudinaryInstance.uploader.upload(req.file.path)


        const newProduct = new Product({
            title,
            description,
            price,
            quantity,
            image:cloudinaryRes.url,
            admin:adminId,
        })

        newProduct.save()

        res.json({data:newProduct,message:"item created"})
    } catch (error) {
        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
    }
}