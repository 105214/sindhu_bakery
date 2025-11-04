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


        if(!userExist.isActive){
            return res.status(401).json({message:"user not exist"})
        }
        // token


        const token =generateToken(userExist._id,"user")
        res.cookie("token",token)

        // delete password from userexist
        delete userExist._doc.password
        res.json({ data:userExist,message :"login success"})
        // { 
        // const {password,...withoutPassword}=userExist

        // }
    } catch (error) {
         res.status(error.statusCode || 500).json({message:error.message || "internal server error"})
     
    }
}


export const userProfile=async(req,res,next)=>{
    try {
        const userId= req.user.id

        const userData=await User.findById(userId).select("-password")

        res.json({data:userData,message:"user profile fetched"})
    } catch (error) {
        res.status(error.statuscode || 500).json({message:error.message || "internal server error"})
    }
}


export const userProfileUpdate=async(req,res,next)=>{
    try {
        const {name,email,password,mobile,profilePic}=req.body

        const userId=req.user.id
        const userData=await User.findByIdAndUpdate(userId,{name,email,password,mobile,profilePic},{new:true})

        res.json({data:userData, message:"user profile fetched"})
    } catch (error) {
        res.status(error.statuscode || 500).json({message:error.message || "internal server error"})
    }
}


export const userLogout=async(req,res,next)=>{
    try {
        res.clearCookie("token")
        res.json({message:"user logout successfully"})
    } catch (error) {
        res.status(error.statuscode || 500).json({message:error.message || "internal server error"})
    }
}

export const checkUser = async(req,res,next)=>{
    try {
        res.json({message:"user authorized"})
    } catch (error) {
         res.status(error.statuscode || 500).json({message:error.message || "internal server error"})
    }
}