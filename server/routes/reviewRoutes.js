import e from "express"
import { authUser } from "../midllewares/authUser.js"
import { addReview, averageRating, deleteReview, getProductReviews } from "../controllers/reviewController.js"
import { authAdmin } from "../midllewares/authAdmin.js"

const router = e.Router()

// add review
router.post("/add-review",authUser,addReview)

// delete review
router.delete("/delete-review",authAdmin,deleteReview)


// get product review
router.get("/product-review",authUser,getProductReviews)

// course average rating
router.get("/avg-rating",authUser,averageRating)

export {router as reviewRouter}