import bcrypt from 'bcrypt'

import { generateToken } from '../utils/token.js'
import { User } from '../models/useModel.js';


export const userSignup=async(req , res ,next)=>{
    try {
console.log("signup hitted");

        // collect user data
        const {name,email,password,mobile,profilePic}=req.body

        // data validation
        if(!name || !email || !password || !mobile){
            return res.status(400).json({message:"all fields required"})
        }

        const userExist=await User.findOne({email})
        
        if(userExist){
            return res.status(400).json({message:"User already exist"})
        }

        // password hasing
        const hashedPassword=bcrypt.hashSync(password,10)

        const newUser=new User({
            name,
            email,
            password:hashedPassword,
            mobile,
            profilePic

        })
        await newUser.save()
    
// generate token using id and role

const token =generateToken(newUser._id,"user")
res.cookie("token",token)
        res.json({data:newUser,message:"signup success"})
    } catch (error) {

        res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
     
    }
}


export const UserLogin=async (req,res,next)=>{
    try {
      
        // collect user data
        const {email,password} = req.body

        // data validation
        if(!email || !password){
            return res.status(400).json({message:"all fields required"})
        }

        // check user exist
        const userExist = await User.findOne({email})
     
        if(!userExist){
            return res.status(404).json({message:"user not found"})
        }
    
        // password match with db
        const passwordMatch = bcrypt.compareSync(password,userExist.password)

        if(!passwordMatch){
            return res.status(401).json({message:"ivalid credentials"})
        }


        // token


        const token =generateToken(userExist._id,"user")
        res.cookie("token",token)

        res.json({ data:userExist,message :"login success"})

    } catch (error) {
         res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
     
    }
}