import { Product } from "../models/productModel.js"
import { Review } from "../models/reviewModel.js"

export const  addReview = async (req,res,next)=>{
    try {
        const {productId,rating,comment} = req.body

        const userId = req.user.userId

        // validate if the course is exist
        const product = await Product.findById(productId)


        if (!product){
            return res.status(404).json({message:"product not found"})
        }

        if(rating>5 || rating <1){
            return res.status(400).json({message:"please provide proper rating"})
        }

        // create or update the review

        const review = await Review.findOneAndUpdate(
            {userId,courseId},
            {rating,comment},
            {new:true,upsert:true}
        )

        res.status(201).json({data:review,message:"review added"})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
}


export const getProductReviews = async(req,res,next)=>{
    try {
        
        const {productId}=req.params

        const reviews = await Review.find({productId}).populate("userId","name").sort({createdAt:-1})

        if(!reviews.length){
            return res.status(404).json({message:"no reviews found on this product"})
        }

        res.status(200).json({data:reviews,message:"Product review fetched"})
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
} 


export const deleteReview = async (req,res,next)=>{
    try {
        
        const {reviewId}=req.params

        const userId = req.user.id

        const review = await Review.findOneAndDelete({id:reviewId,userId})

        if(!review){
            return res.status(404).json({message:"review not found or not authorized"})
        }

        res.status(200).json({message:"Review deleted successfully"})
    } catch (error) {
         res.status(500).json({message:"internal server error",error})
    }
}

export const averageRating = async(req,res,next)=>{

    try {
        const {productId} = req.params

        const reviews = await Review.find({productId})

        if(!reviews.length){
            return res.status(404).json({message:"Average rating fetched"})
        }
        
    } catch (error) {
        res.status(500).json({message:"internal server error",error})
    }
}