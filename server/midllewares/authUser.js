import jwt from 'jsonwebtoken'



export const authUser=(req,res,next)=>{

    try {

        // collect token from cookies
        const {token}=req.cookies

        if(!token){
            return res.status(401).json({message:"user not authorized"})
        }
        
        // decoded token
        const decodedToken= jwt.verify(token,process.env.JWT_SECRETkEY)

        if(!decodedToken){
           return res.status(401).json({message:"user not authorized"}) 
        }


        req.user=decodedToken
        next()

    } catch (error) {
        return res.status(error.statuscode || 500).json({message:error.message || "internal server error"})
    }
}